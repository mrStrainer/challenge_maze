import { Directions, PossibleDirections, ArrowDirections, ArrowKeys, AllActionTypes, ArrowActionTypes } from "./types";

export const ACTIONS: {
  [k in AllActionTypes]: k
} = {
  MOVE_WEST: 'MOVE_WEST',
  MOVE_NORTH: 'MOVE_NORTH',
  MOVE_EAST: 'MOVE_EAST',
  MOVE_SOUTH: 'MOVE_SOUTH',
  INITIALIZE_MAZE: 'INITIALIZE_MAZE',
  SET_LOADING: 'SET_LOADING',
  SET_GAME_STATE: 'SET_GAME_STATE',
  INVALID_MOVE: 'INVALID_MOVE',
  UPDATE_MAZE: 'UPDATE_MAZE'
}

export const borders: Directions[] = ['north', 'west']

export const directions: PossibleDirections = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

export const arrowDirections: ArrowDirections = {
  ArrowLeft: 'west',
  ArrowUp: 'north',
  ArrowRight: 'east',
  ArrowDown: 'south'
}
export const arrows = ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown']

export const ARROW_ACTIONS: {
  [k in ArrowKeys]: ArrowActionTypes
} = {
  ArrowLeft: 'MOVE_WEST',
  ArrowUp: 'MOVE_NORTH',
  ArrowRight: 'MOVE_EAST',
  ArrowDown: 'MOVE_SOUTH',
}