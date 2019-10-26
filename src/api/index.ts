import { mazeOptions, NewMaze, MazeData, Directions } from '../types'

const METHOD = {
  GET: 'GET',
  POST: 'POST'
}

export const createOptions = ({
  method = METHOD.GET,
  body = null
}: { method?: string; body?: mazeOptions } = {}): RequestInit => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})

const status = (res: Response) => {
  if (!res.ok) {
    throw res
  }
  return res.json()
}

export function createMaze({
  width = 15,
  height = 15,
  name = 'Twilight Sparkle',
  difficulty = 0
}): Promise<NewMaze> {
  return fetch(
    'https://ponychallenge.trustpilot.com/pony-challenge/maze',
    createOptions({
      method: 'POST',
      body: {
        'maze-width': width,
        'maze-height': height,
        'maze-player-name': name,
        difficulty: difficulty
      }
    })
  ).then(status)
}

export function getMazeById(id: string): Promise<MazeData> {
  return fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`).then(status)
}

export function sendMove(id: string, direction: Directions) {
  return fetch(
    `https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`,
    createOptions({
      method: METHOD.POST,
      body: { direction }
    })
  ).then(status)
}
