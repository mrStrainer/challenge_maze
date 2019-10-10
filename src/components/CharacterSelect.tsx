import React from 'react'
import { CHARACTERS } from '../constants'

const CharacterOptions = CHARACTERS.map(char => (
  <option key={char} value={char}>
    {char}
  </option>
))

type Props = {
  dispatch: React.Dispatch<any>
  name: string
}

const CharacterSelect: React.FC<Props> = ({ dispatch, name }) => {
  return (
    <div className='top'>
      <label htmlFor='name'>
        Character:
        <select
          name='name'
          id='name'
          value={name}
          onChange={e =>
            dispatch({
              type: 'SELECT_NAME',
              payload: e.target.value
            })
          }
        >
          {CharacterOptions}
        </select>
      </label>
    </div>
  )
}

export default CharacterSelect
