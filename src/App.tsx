import React from 'react'
import seed from './data/data.json'

const directions: PossibleDirections = {
  north: 'north',
  south: 'south',
  east: 'east',
  west: 'west'
}

const borders: Directions[] = ['north', 'west']

type Directions = 'north' | 'south' | 'east' | 'west'

type PossibleDirections = {
  [k in Directions]: k
}

type MazeData = {
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

const Char = ({
  index,
  current
}: {
  index: number
  current: { position: number; wasValid: boolean; keyPressed: { key: string; last: number } }
}) =>
  index === current.position ? (
    <>
      <span
        key={current.keyPressed.last}
        className={`overlay ${current.wasValid && index === current.position ? '' : 'err'}`}
      ></span>
      <b>P</b>
    </>
  ) : index === seed.domokun[0] ? (
    <>D</>
  ) : index === seed['end-point'][0] ? (
    <>E</>
  ) : (
    <>{index}</>
  )

const getValidMoves = ({ data, size }: MazeData) => {
  const maxIndex = seed.data.length - 1
  const [rowLength] = seed.size // rowLength * colLength - 1;
  return data.map((cell, index) => {
    let validMoves = borders.filter(b => !cell.includes(b))
    if (index < maxIndex - rowLength + 1 && !data[index + 15].includes(directions.north)) {
      validMoves.push(directions.south)
    }
    if (!(index % rowLength === rowLength - 1) && !data[index + 1].includes(directions.west)) {
      validMoves.push(directions.east)
    }
    return validMoves
  })
}

const useMove = (seed: MazeData) => {
  const [{ position, wasValid }, setCurrent] = React.useState<{
    position: number
    wasValid: boolean
  }>({
    position: seed.pony[0],
    wasValid: false
  })
  const [keyPressed, setKeyPressed] = React.useState({ key: '', last: 0 })
  const validMoves = React.useMemo(() => getValidMoves(seed as MazeData), [seed])

  React.useEffect(() => {
    const setKey = ({ key }: KeyboardEvent) => setKeyPressed({ key, last: Date.now() })

    window.addEventListener('keydown', setKey)
    return () => window.removeEventListener('keydown', setKey)
  }, [])

  React.useEffect(() => {
    if (keyPressed.key === 'ArrowLeft' && validMoves[position].includes(directions.west)) {
      setCurrent(c => ({
        position: c.position - 1,
        wasValid: true
      }))
    } else if (keyPressed.key === 'ArrowUp' && validMoves[position].includes(directions.north)) {
      setCurrent(c => ({
        position: c.position - 15,
        wasValid: true
      }))
    } else if (keyPressed.key === 'ArrowRight' && validMoves[position].includes(directions.east)) {
      setCurrent(c => ({
        position: c.position + 1,
        wasValid: true
      }))
    } else if (keyPressed.key === 'ArrowDown' && validMoves[position].includes(directions.south)) {
      setCurrent(c => ({
        position: c.position + 15,
        wasValid: true
      }))
    } else {
      setCurrent(c => ({
        ...c,
        wasValid: false
      }))
    }
  }, [keyPressed])

  return { position, wasValid, keyPressed }
}

const App: React.FC = () => {
  const [maze, setMaze] = React.useState(seed.data as Directions[][])
  const current = useMove(seed as MazeData)
  return (
    <div className='App'>
      <div
        className='table'
        style={{
          gridTemplateColumns: `repeat(${seed.size[0]}, 42px)`,
          gridTemplateRows: `repeat(${seed.size[1]}, 42px)`
        }}
      >
        {(seed as MazeData).data.map((cell, index) => (
          <div key={`cell-${index}`} className={`cell ${cell.join(' ')} `}>
            <Char index={index} current={current} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
