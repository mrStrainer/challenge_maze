export type Directions = 'north' | 'south' | 'east' | 'west'

export type MazeData = {
  pony: number[]
  domokun: number[]
  'end-point': number[]
  size: number[]
  difficulty: number
  data: Directions[][]
  maze_id: string
  'game-state': GameState
}

export type GameState = {
  state: 'Active' | 'won' | string
  'state-result': 'Successfully created' | 'You won. Game ended' | 'Move accepted' | string
  'hidden-url'?: string //TODO show when 'won'
}

export type ArrowActionTypes =
  | 'MOVE_NORTH'
  | 'MOVE_SOUTH'
  | 'MOVE_EAST'
  | 'MOVE_WEST'

export type InvalidMoveTyoe = 'INVALID_MOVE'

export type ActionTypes =
  | 'SET_LOADING'
  | 'INITIALIZE_MAZE'
  | 'SET_GAME_STATE'
  | 'UPDATE_MAZE'

export type AllActionTypes = ArrowActionTypes | InvalidMoveTyoe | ActionTypes

export type Actions =
  | { type: 'MOVE_NORTH' }
  | { type: 'MOVE_SOUTH' }
  | { type: 'MOVE_EAST' }
  | { type: 'MOVE_WEST' }
  | { type: 'INVALID_MOVE' }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'INITIALIZE_MAZE', payload: MazeData }
  | { type: 'SET_GAME_STATE', payload: GameState }
  | { type: 'UPDATE_MAZE', payload: MazeData & { lastMove: number } }


export type AppState = {
  maze: Directions[][]
  rowLength: number
  colLength: number
  position: number
  domokun: number
  end: number
  status: GameState
  loading: boolean
  mazeId: string
  lastMove: number
}

export type mazeOptions = {
  "maze-width": number,
  "maze-height": number,
  "maze-player-name": string,
  "difficulty": number
} | PostDirection | null

export type PostDirection = {
  direction: Directions
}

export type NewMaze = {
  maze_id: string
}

export type PossibleDirections = {
  [k in Directions]: k
}
export type ArrowKeys = 'ArrowLeft' | 'ArrowUp' | 'ArrowRight' | 'ArrowDown'

export type ArrowDirections = {
  [k in ArrowKeys]: Directions
}