import React from 'react'
// const id = '6377d918-21d2-4634-ab3e-0a865f86a4e4'

const characters = [
  'Twilight Sparkle',
  'Applejack',
  'Fluttershy',
  'Rarity',
  'Pinkie Pie',
  'Rainbow Dash',
  'Spike'
]

const CharacterOptions = characters.map(char => (
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
  )
}

export default CharacterSelect
