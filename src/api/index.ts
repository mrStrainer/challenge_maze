import { Directions, MazeData } from '../components/Maze'

type mazeOptions = {
  "maze-width": number,
  "maze-height": number,
  "maze-player-name": string,
  "difficulty": number
} | PostDirection | null

type PostDirection = {
  direction: Directions
}
type NewMaze = {
  maze_id: string
}
const METHOD = {
  GET: 'GET',
  POST: 'POST'
}

export const createOptions = ({ method = METHOD.GET, body = null }: { method?: string, body?: mazeOptions } = {}): RequestInit => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})

const status = async (res: Response) => {
  if (!res.ok) {
    throw res
  }
  const response = await res.json()
  console.log(response)
  return response
}

export function createMaze({ width = 15, height = 15, name = 'Twilight Sparkle', difficulty = 0 }): Promise<NewMaze> {
  return fetch("https://ponychallenge.trustpilot.com/pony-challenge/maze", createOptions({
    method: 'POST',
    body: {
      "maze-width": width,
      "maze-height": height,
      "maze-player-name": name,
      "difficulty": difficulty
    }
  })).then(status)
}

export async function getMazeById(id: string): Promise<MazeData> {
  return fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`).then(status)

}

export async function sendMove(id: string, direction: Directions) {
  return fetch(`https://ponychallenge.trustpilot.com/pony-challenge/maze/${id}`, createOptions({
    method: METHOD.POST,
    body: { direction }
  })).then(status)
}