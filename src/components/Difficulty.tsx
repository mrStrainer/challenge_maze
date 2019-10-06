import React from 'react'

type Props = {
  dispatch: React.Dispatch<any>
  difficulty: number
}

const Difficulty: React.FC<Props> = ({ dispatch, difficulty }) => {
  return (
    <label htmlFor='difficulty'>
      Difficulty
      <input
        type='number'
        name='difficulty'
        id='difficulty'
        value={difficulty}
        onChange={e =>
          dispatch({
            type: 'SELECT_DIFFICULTY',
            payload: e.target.value
          })
        }
      />
    </label>
  )
}

export default Difficulty
