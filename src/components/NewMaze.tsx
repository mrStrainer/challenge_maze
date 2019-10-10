import React from 'react'
import CharacterSelect from './CharacterSelect'
import SizeSelect from './SizeSelect'
import Difficulty from './Difficulty'
import * as api from '../api'

const initialState = {
  name: 'Twilight Sparkle',
  difficulty: 0,
  width: 15,
  height: 15,
  error: undefined as unknown
}

type FormState = typeof initialState

type Action =
  | { type: 'SELECT_WIDTH'; payload: number }
  | { type: 'SELECT_HEIGHT'; payload: number }
  | { type: 'SELECT_DIFFICULTY'; payload: number }
  | { type: 'SELECT_NAME'; payload: string }
  | { type: 'SET_STATE'; payload: Partial<FormState> }

function reducer(state: FormState, action: Action) {
  switch (action.type) {
    case 'SELECT_WIDTH':
      return {
        ...state,
        width: Number(action.payload)
      }
    case 'SELECT_HEIGHT':
      return {
        ...state,
        height: Number(action.payload)
      }
    case 'SELECT_DIFFICULTY':
      return {
        ...state,
        difficulty: Number(action.payload)
      }
    case 'SELECT_NAME':
      return {
        ...state,
        name: action.payload
      }
    case 'SET_STATE':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

type Props = {
  setMaze: (value: string) => void
  changeView: (value: string) => void
}

const NewMaze: React.FC<Props> = ({ setMaze, changeView }) => {
  const [form, dispatch] = React.useReducer(reducer, initialState)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await api
      .createMaze(form)
      .then(({ maze_id }) => {
        sessionStorage.setItem('mazeId', maze_id)
        setMaze(maze_id)
        changeView('MAZE')
      })
      .catch(async e => dispatch({ type: 'SET_STATE', payload: { error: await e.text() } }))
  }
  return (
    <form onSubmit={handleSubmit} className='new-maze'>
      <CharacterSelect dispatch={dispatch} name={form.name} />
      <SizeSelect dispatch={dispatch} width={form.width} height={form.height} />
      <Difficulty dispatch={dispatch} difficulty={form.difficulty} />
      <button type='submit'>New maze</button>
    </form>
  )
}

export default NewMaze
