import { Directions, PossibleDirections, ArrowDirections, ActionTypes } from "./types";

export const CHARACTERS = [
  'Twilight Sparkle',
  'Applejack',
  'Fluttershy',
  'Rarity',
  'Pinkie Pie',
  'Rainbow Dash',
  'Spike'
]

export const SIZES = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

export const ACTIONS: {
  [k in ActionTypes]: k
} = {
  MOVE: 'MOVE',
  INITIALIZE_MAZE: 'INITIALIZE_MAZE',
  SET_LOADING: 'SET_LOADING',
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