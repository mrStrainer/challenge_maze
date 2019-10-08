import React from 'react'
import Cell from './Cell'
import { ACTIONS } from '../constants'
import { AppState, Actions } from '../types'
import * as api from '../api'
import { useMove } from '../hooks/move'

function reducer(state: AppState, action: Actions) {
  switch (action.type) {
    case ACTIONS.MOVE_WEST:
      return {
        ...state,
        position: state.position - 1,
        lastMove: 0
      }
    case ACTIONS.MOVE_NORTH:
      return {
        ...state,
        position: state.position - state.rowLength,
        lastMove: 0
      }
    case ACTIONS.MOVE_EAST:
      return {
        ...state,
        position: state.position + 1,
        lastMove: 0
      }
    case ACTIONS.MOVE_SOUTH:
      return {
        ...state,
        position: state.position + state.rowLength,
        lastMove: 0
      }
    case ACTIONS.SET_GAME_STATE:
      return {
        ...state,
        status: action.payload
      }
    case ACTIONS.INVALID_MOVE:
      return {
        ...state,
        lastMove: Date.now()
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
        mazeId: payload.maze_id,
        lastMove: 0
      }
    default:
      return state
  }
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
    mazeId: '',
    lastMove: 0
  })

  React.useEffect(() => {
    update({ type: 'SET_LOADING', payload: true })
    if (id !== null) {
      api
        .getMazeById(id)
        .then(payload => update({ type: 'INITIALIZE_MAZE', payload }))
        .catch(e => update({ type: 'SET_LOADING', payload: false }))
    }
  }, [id])

  useMove(state, update)
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
              lastMove={state.lastMove}
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
