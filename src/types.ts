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
  state: 'Active' | 'won' | 'over' | string
  'state-result': 'Successfully created' | 'You won. Game ended' | 'Move accepted' | 'You lost. Killed by monster' | string
  'hidden-url'?: string
}

export type ActionTypes =
  | 'MOVE'
  | 'SET_LOADING'
  | 'INITIALIZE_MAZE'
  | 'UPDATE_MAZE'

export type Actions =
  | { type: 'MOVE', payload: Directions }
  | { type: 'SET_LOADING', payload: boolean }
  | { type: 'INITIALIZE_MAZE', payload: MazeData }
  | { type: 'UPDATE_MAZE', payload: MazeData }


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
  validMoves: Directions[][]
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