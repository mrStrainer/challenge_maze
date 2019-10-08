export type Directions = 'north' | 'south' | 'east' | 'west'

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

export type GameState = {
  state: 'Active' | 'won' | string
  'state-result': 'Successfully created' | 'You won. Game ended' | 'Move accepted' | string
  'hidden-url'?: string //TODO show when 'won'
}

export type ActionTypes =
  | 'MOVE_NORTH'
  | 'MOVE_SOUTH'
  | 'MOVE_EAST'
  | 'MOVE_WEST'
  | 'SET_LOADING'
  | 'INITIALIZE_MAZE'
  | 'SET_GAME_STATE'
  | 'INVALID_MOVE'

export type Actions =
  | { type: 'MOVE_NORTH' }
  | { type: 'MOVE_SOUTH' }
  | { type: 'MOVE_EAST' }
  | { type: 'MOVE_WEST' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'INITIALIZE_MAZE'; payload: MazeData }
  | { type: 'SET_GAME_STATE'; payload: GameState }
  | { type: 'INVALID_MOVE' }


export type AppState = {
  maze: Directions[][]
  rowLength: number
  colLength: number
  position: number
  domokun: number
  end: number
  status: {
    state: 'Active' | 'won' | string
    'state-result': 'Successfully created' | 'You won. Game ended' | 'Move accepted' | string
  }
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