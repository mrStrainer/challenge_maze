import React, { Dispatch } from 'react'
import { getValidMoves } from '../api/utils'
import * as api from '../api'
import { AppState, Actions } from '../types'
import { ACTIONS, directions } from '../constants'

export const useMove = (state: AppState, update: Dispatch<Actions>) => {
  const [keyPressed, setKeyPressed] = React.useState('')
  const validMoves = React.useMemo(() => getValidMoves(state.maze, state.rowLength), [
    state.maze,
    state.rowLength
  ])

  React.useEffect(() => {
    const setKey = ({ key }: KeyboardEvent) => setKeyPressed(key)
    window.addEventListener('keydown', setKey)
    return () => window.removeEventListener('keydown', setKey)
  }, [])

  const isMoving = React.useRef(false)
  React.useEffect(() => {
    if (keyPressed !== '' && !isMoving.current) {
      if (keyPressed === 'ArrowLeft') {
        isMoving.current = true
        const isValidMove = validMoves[state.position].includes(directions.west)
        api
          .sendMove(state.mazeId, directions.west)
          .then(() => update({ type: isValidMove ? ACTIONS.MOVE_WEST : ACTIONS.INVALID_MOVE }))
          .finally(() => {
            setKeyPressed('')
            isMoving.current = false
          })
      } else if (keyPressed === 'ArrowUp') {
        const isValidMove = validMoves[state.position].includes(directions.north)
        isMoving.current = true
        api
          .sendMove(state.mazeId, directions.north)
          .then(() => update({ type: isValidMove ? ACTIONS.MOVE_NORTH : ACTIONS.INVALID_MOVE }))
          .finally(() => {
            setKeyPressed('')
            isMoving.current = false
          })
      } else if (keyPressed === 'ArrowRight') {
        isMoving.current = true
        const isValidMove = validMoves[state.position].includes(directions.east)
        api
          .sendMove(state.mazeId, directions.east)
          .then(() => update({ type: isValidMove ? ACTIONS.MOVE_EAST : ACTIONS.INVALID_MOVE }))
          .finally(() => {
            setKeyPressed('')
            isMoving.current = false
          })
      } else if (keyPressed === 'ArrowDown') {
        isMoving.current = true
        const isValidMove = validMoves[state.position].includes(directions.south)
        api
          .sendMove(state.mazeId, directions.south)
          .then(() => update({ type: isValidMove ? ACTIONS.MOVE_SOUTH : ACTIONS.INVALID_MOVE }))
          .finally(() => {
            setKeyPressed('')
            isMoving.current = false
          })
      } else {
        setKeyPressed('')
      }
    }
  }, [keyPressed, state.mazeId, state.position, update, validMoves])

  return { keyPressed }
}