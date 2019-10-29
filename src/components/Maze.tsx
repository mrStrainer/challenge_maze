import React from 'react'
import Cell from './Cell'
import { ACTIONS, directions } from '../constants'
import { AppState, Actions, Directions } from '../types'
import * as api from '../api'
import { useMove } from '../hooks/move'
import { getValidMoves, getImageUrl } from '../api/utils'

function move({ position, validMoves, rowLength }: AppState, direction: Directions) {
  let lastMove = Date.now()
  let newPosition = position
  if (validMoves[position].includes(direction)) {
    lastMove = 0
    switch (direction) {
      case directions.west:
        newPosition -= 1
        break
      case directions.north:
        newPosition -= rowLength
        break
      case directions.east:
        newPosition += 1
        break
      case directions.south:
        newPosition += rowLength
        break
    }
  }
  return {
    lastMove,
    position: newPosition
  }
}

function reducer(state: AppState, action: Actions) {
  switch (action.type) {
    case ACTIONS.MOVE:
      return {
        ...state,
        ...move(state, action.payload)
      }
    case ACTIONS.UPDATE_MAZE:
      return {
        ...state,
        lastMove: state.position !== action.payload.pony[0] ? 0 : Date.now(),
        position: action.payload.pony[0],
        domokun: action.payload.domokun[0],
        status: action.payload['game-state'],
        loading: false
      }
    case ACTIONS.INITIALIZE_MAZE:
      return {
        ...state,
        maze: action.payload.data,
        rowLength: action.payload.size[0],
        colLength: action.payload.size[1],
        position: action.payload.pony[0],
        domokun: action.payload.domokun[0],
        end: action.payload['end-point'][0],
        status: action.payload['game-state'],
        mazeId: action.payload.maze_id,
        validMoves: getValidMoves(state.maze, state.rowLength),
        loading: false,
        lastMove: 0
      }
    default:
      return state
  }
}

const initialState = {
  maze: [],
  rowLength: 0,
  colLength: 0,
  position: 0,
  domokun: 0,
  end: 0,
  status: {
    state: 'Inactive',
    'state-result': 'Not loaded',
    'hidden-url': undefined
  },
  loading: false,
  mazeId: '',
  validMoves: [],
  lastMove: 0
}

type Props = {
  id: string | null
}

const Maze: React.FC<Props> = ({ id }) => {
  const [state, update] = React.useReducer(reducer, initialState)
  useMove(state, update)

  React.useEffect(() => {
    update({ type: 'SET_LOADING', payload: true })
    if (id !== null) {
      api
        .getMazeById(id)
        .then(payload => update({ type: 'INITIALIZE_MAZE', payload }))
        .catch(e => update({ type: 'SET_LOADING', payload: false }))
    }
  }, [id])

  if (state.loading) {
    return <div className='top'>{'Loading...'}</div>
  }
  if (state.status['hidden-url']) {
    return <img src={getImageUrl(state.status['hidden-url'])} alt='Game ended' className='image' />
  }
  return (
    <>
      <div
        className='table'
        style={{
          gridTemplateColumns: `repeat(${state.rowLength}, minmax(1.5vmin,5.5vmin))`,
          gridTemplateRows: `repeat(${state.colLength}, minmax(1.5vmin,5.5vmin))`
        }}
      >
        {state.maze.map((cell, index) => (
          <div key={`cell-${index}`} className={`cell ${cell.join(' ')} `}>
            <Cell
              index={index}
              domokun={state.domokun}
              end={state.end}
              current={state.position}
              lastMove={state.lastMove}
            />
          </div>
        ))}
      </div>
      <div className='top'>{state.status['state-result']}</div>
    </>
  )
}

export default Maze
