import React, { Dispatch } from 'react'
import { isArrowKey } from '../api/utils'
import * as api from '../api'
import { AppState, Actions, Directions } from '../types'
import { ACTIONS, arrowDirections } from '../constants'

export const useMove = (state: AppState, update: Dispatch<Actions>) => {
  const [keyPressed, setKeyPressed] = React.useState('')

  const movePony = React.useCallback(async (mazeId: string, move: Directions) => {
    try {
      await api.sendMove(mazeId, move)
      const mazeUpdate = await api.getMazeById(mazeId)
      update({ type: ACTIONS.UPDATE_MAZE, payload: mazeUpdate })
    } catch (e) {
      console.log(e)
      update({ type: ACTIONS.MOVE, payload: move })
    }
  }, [update])

  React.useEffect(() => {
    const setKey = ({ key }: KeyboardEvent) => setKeyPressed(key)
    window.addEventListener('keydown', setKey)
    return () => window.removeEventListener('keydown', setKey)
  }, [])

  React.useEffect(() => {
    if (isArrowKey(keyPressed)) {
      const nextMove = arrowDirections[keyPressed]
      setKeyPressed('')
      movePony(state.mazeId, nextMove)
    }
  }, [keyPressed, movePony, state.mazeId, update])
}
