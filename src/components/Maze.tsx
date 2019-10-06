import React, { Dispatch } from 'react'
import Cell from './Cell'
import * as api from '../api'

const directions: PossibleDirections = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

const borders: Directions[] = ['north', 'west']

export type Directions = 'north' | 'south' | 'east' | 'west'

type PossibleDirections = {
  [k in Directions]: k
}
export type MazeData = {
  pony: number[]
  domokun: number[]
  'end-point': number[]
  size: number[]
  difficulty: number
  data: Directions[][]
  maze_id: string
  'game-state': {
    state: string
    'state-result': string
  }
}

const getValidMoves = (cells: Directions[][], rowLength: number) => {
  const maxIndex = cells.length - 1
  return cells.map((cell, index) => {
    let validMoves = borders.filter(b => !cell.includes(b))
    if (index < maxIndex - rowLength + 1 && !cells[index + 15].includes(directions.north)) {
      validMoves.push(directions.south)
    }
    if (!(index % rowLength === rowLength - 1) && !cells[index + 1].includes(directions.west)) {
      validMoves.push(directions.east)
    }
    return validMoves
  })
}

type GameState = {
  state: 'Active' | 'won' | string
  'state-result': 'Successfully created' | 'You won. Game ended' | 'Move accepted' | string
  'hidden-url'?: string //TODO show when 'won'
}

type ActionTypes =
  | 'MOVE_NORTH'
  | 'MOVE_SOUTH'
  | 'MOVE_EAST'
  | 'MOVE_WEST'
  | 'SET_LOADING'
  | 'INITIALIZE_MAZE'
  | 'SET_GAME_STATE'

type Actions =
  | { type: 'MOVE_NORTH' }
  | { type: 'MOVE_SOUTH' }
  | { type: 'MOVE_EAST' }
  | { type: 'MOVE_WEST' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INITIALIZE_MAZE'; payload: MazeData }
  | { type: 'SET_GAME_STATE'; payload: GameState }

const ACTIONS: {
  [k in ActionTypes]: k
} = {
  MOVE_WEST: 'MOVE_WEST',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_EAST: 'MOVE_EAST',
  MOVE_SOUTH: 'MOVE_SOUTH',
  INITIALIZE_MAZE: 'INITIALIZE_MAZE',
  SET_LOADING: 'SET_LOADING',
  SET_GAME_STATE: 'SET_GAME_STATE'
}

type AppState = {
  maze: Directions[][]
  rowLength: number
  colLength: number
  position: number
  domokun: number
  end: number
  status: {
    state: 'Active' | 'won' | string
    'state-result': 'Successfully created' | 'You won. Game ended' | string
  }
  loading: boolean
  mazeId: string
}

function reducer(state: AppState, action: Actions) {
  switch (action.type) {
    case ACTIONS.MOVE_WEST:
      return {
        ...state,
        position: state.position - 1
      }
    case ACTIONS.MOVE_NORTH:
      return {
        ...state,
        position: state.position - state.rowLength
      }
    case ACTIONS.MOVE_EAST:
      return {
        ...state,
        position: state.position + 1
      }
    case ACTIONS.MOVE_SOUTH:
      return {
        ...state,
        position: state.position + state.rowLength
      }
    case ACTIONS.SET_GAME_STATE:
      return {
        ...state,
        status: action.payload
      }
    case ACTIONS.INITIALIZE_MAZE:
      const { payload } = action
      console.log({ payload })
      return {
        ...state,
        maze: payload.data,
        rowLength: payload.size[0],
        colLength: payload.size[1],
        position: payload.pony[0],
        domokun: payload.domokun[0],
        end: payload['end-point'][0],
        status: payload['game-state'],
        initialized: true,
        mazeId: payload.maze_id
      }
    default:
      return state
  }
}
const useMove = (state: AppState, update: Dispatch<Actions>) => {
  const validMoves = React.useMemo(() => getValidMoves(state.maze, state.rowLength), [
    state.maze,
    state.rowLength
  ])
  const [keyPressed, setKeyPressed] = React.useState({ key: '', last: Date.now() })

  React.useEffect(() => {
    const setKey = ({ key }: KeyboardEvent) => setKeyPressed({ key, last: Date.now() })
    window.addEventListener('keydown', setKey)
    return () => window.removeEventListener('keydown', setKey)
  }, [])
  const isMoving = React.useRef(false)
  React.useEffect(() => {
    if (keyPressed.key !== '' && !isMoving.current) {
      if (keyPressed.key === 'ArrowLeft' && validMoves[state.position].includes(directions.west)) {
        isMoving.current = true
        api.sendMove(state.mazeId, directions.west).then(() => {
          update({ type: ACTIONS.MOVE_WEST })
          setKeyPressed({ key: '', last: 0 }) //setKeyPressed({key:0} /{key:1})
          isMoving.current = false
        })
      } else if (
        keyPressed.key === 'ArrowUp' &&
        validMoves[state.position].includes(directions.north)
      ) {
        isMoving.current = true
        api.sendMove(state.mazeId, directions.north).then(() => {
          update({ type: ACTIONS.MOVE_NORTH })
          setKeyPressed({ key: '', last: 0 })
          isMoving.current = false
        })
      } else if (
        keyPressed.key === 'ArrowRight' &&
        validMoves[state.position].includes(directions.east)
      ) {
        isMoving.current = true
        api.sendMove(state.mazeId, directions.east).then(() => {
          update({ type: ACTIONS.MOVE_EAST })
          setKeyPressed({ key: '', last: 0 })
          isMoving.current = false
        })
      } else if (
        keyPressed.key === 'ArrowDown' &&
        validMoves[state.position].includes(directions.south)
      ) {
        isMoving.current = true
        api.sendMove(state.mazeId, directions.south).then(() => {
          update({ type: ACTIONS.MOVE_SOUTH })
          setKeyPressed({ key: '', last: 0 })
          isMoving.current = false
        })
      } else {
        setKeyPressed({ key: '', last: 1 })
      }
    }
  }, [keyPressed.key, state.mazeId, state.position, update, validMoves])

  return { keyPressed }
}

const Maze = ({ id }: { id: string | null }) => {
  const [state, update] = React.useReducer(reducer, {
    maze: [],
    rowLength: 0,
    colLength: 0,
    position: 0,
    domokun: 0,
    end: 0,
    status: {
      state: 'Inactive',
      'state-result': 'Not loaded'
    },
    loading: false,
    mazeId: ''
  })

  React.useEffect(() => {
    update({ type: 'SET_LOADING', payload: true })
    if (id !== null) {
      api
        .getMazeById(id)
        .then(payload => {
          update({ type: 'INITIALIZE_MAZE', payload })
        })
        .catch(e => update({ type: 'SET_LOADING', payload: false }))
    }
  }, [id])
  const { keyPressed } = useMove(state, update)
  return state.loading ? (
    <div className='top'>{'Loading...'}</div>
  ) : (
    <>
      <div
        className='table'
        style={{
          gridTemplateColumns: `repeat(${state.rowLength}, 42px)`,
          gridTemplateRows: `repeat(${state.colLength}, 42px)`
        }}
      >
        {state.maze.map((cell, index) => (
          <div key={`cell-${index}`} className={`cell ${cell.join(' ')} `}>
            <Cell
              index={index}
              domokun={state.domokun}
              end={state.end}
              current={state.position}
              keyPressed={keyPressed}
            />
          </div>
        ))}
      </div>
      <div className='top'>
        {state.status.state} - {state.status['state-result']}
      </div>
    </>
  )
}

export default Maze
