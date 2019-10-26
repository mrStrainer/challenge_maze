import React, { Dispatch } from 'react'
import { isArrowKey } from '../api/utils'
import * as api from '../api'
import { AppState, Actions } from '../types'
import { ACTIONS, arrowDirections } from '../constants'

export const useMove = (state: AppState, update: Dispatch<Actions>) => {
  const movePony = React.useCallback(
    async (mazeId: string, keyPressed) => {
      if (isArrowKey(keyPressed)) {
        const nextMove = arrowDirections[keyPressed]
        try {
          await api.sendMove(mazeId, nextMove)
          const mazeUpdate = await api.getMazeById(mazeId)
          update({ type: ACTIONS.UPDATE_MAZE, payload: mazeUpdate })
        } catch (e) {
          console.log(e)
          update({ type: ACTIONS.MOVE, payload: nextMove })
        }
      }
    },
    [update]
  )

  React.useEffect(() => {
    const move = ({ key }: KeyboardEvent) => movePony(state.mazeId, key)
    window.addEventListener('keydown', move)
    return () => window.removeEventListener('keydown', move)
  }, [movePony, state.mazeId])
}
