import { ActionTypes, Directions, PossibleDirections } from "./types";

export const ACTIONS: {
  [k in ActionTypes]: k
} = {
  MOVE_WEST: 'MOVE_WEST',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_EAST: 'MOVE_EAST',
  MOVE_SOUTH: 'MOVE_SOUTH',
  INITIALIZE_MAZE: 'INITIALIZE_MAZE',
  SET_LOADING: 'SET_LOADING',
  SET_GAME_STATE: 'SET_GAME_STATE',
  INVALID_MOVE: 'INVALID_MOVE'
}

export const borders: Directions[] = ['north', 'west']

export const directions: PossibleDirections = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}