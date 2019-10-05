import React from 'react'
import seed from './data/data.json'

const directions: PossibleDirections = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

const borders: Directions[] = ['north', 'west']

type Directions = 'north' | 'south' | 'east' | 'west'

type PossibleDirections = {
  [k in Directions]: k
}

type MazeData = {
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

const Char = ({
  index,
  current,
  keyPressed
}: {
  index: number
  current: number
  keyPressed: { key: string; last: number }
}) =>
  index === current ? (
    <>
      <span className={`overlay ${keyPressed.last === 0 ? '' : 'err'}`}></span>
      <b>P</b>
    </>
  ) : index === seed.domokun[0] ? (
    <>D</>
  ) : index === seed['end-point'][0] ? (
    <>E</>
  ) : (
    <>{index}</>
  )

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

type Actions = 'MOVE_NORTH' | 'MOVE_SOUTH' | 'MOVE_EAST' | 'MOVE_WEST'

const ACTIONS: {
  [k in Actions]: k
} = {
  MOVE_WEST: 'MOVE_WEST',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_EAST: 'MOVE_EAST',
  MOVE_SOUTH: 'MOVE_SOUTH'
}

type AppState = {
  maze: Directions[][]
  rowLength: number
  colLength: number
  position: number
  domokun: number
  end: number
  status: string
}

function reducer(state: AppState, action: Actions) {
  switch (action) {
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
    default:
      return state
  }
}

const useMove = (seed: MazeData) => {
  const [state, update] = React.useReducer(reducer, {
    maze: seed.data,
    rowLength: seed.size[0],
    colLength: seed.size[1],
    position: seed.pony[0],
    domokun: seed.domokun[0],
    end: seed['end-point'][0],
    status: seed['game-state'].state
  })
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

  React.useEffect(() => {
    if (keyPressed.key === 'ArrowLeft' && validMoves[state.position].includes(directions.west)) {
      update(ACTIONS.MOVE_WEST)
      setKeyPressed({ key: '', last: 0 })
    } else if (
      keyPressed.key === 'ArrowUp' &&
      validMoves[state.position].includes(directions.north)
    ) {
      update(ACTIONS.MOVE_NORTH)
      setKeyPressed({ key: '', last: 0 })
    } else if (
      keyPressed.key === 'ArrowRight' &&
      validMoves[state.position].includes(directions.east)
    ) {
      update(ACTIONS.MOVE_EAST)
      setKeyPressed({ key: '', last: 0 })
    } else if (
      keyPressed.key === 'ArrowDown' &&
      validMoves[state.position].includes(directions.south)
    ) {
      update(ACTIONS.MOVE_SOUTH)
      setKeyPressed({ key: '', last: 0 })
    } else {
      setKeyPressed({ key: '', last: Date.now() })
    }
  }, [keyPressed.key, state.position, validMoves])

  return { state, keyPressed }
}

const App: React.FC = () => {
  const { state, keyPressed } = useMove(seed as MazeData)
  return (
    <div className='App'>
      <div
        className='table'
        style={{
          gridTemplateColumns: `repeat(${state.rowLength}, 42px)`,
          gridTemplateRows: `repeat(${state.colLength}, 42px)`
        }}
      >
        {state.maze.map((cell, index) => (
          <div key={`cell-${index}`} className={`cell ${cell.join(' ')} `}>
            <Char
              index={index}
              current={state.position}
              keyPressed={keyPressed}
              key={keyPressed.last}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
