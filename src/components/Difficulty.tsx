import React from 'react'

type Props = {
  dispatch: React.Dispatch<any>
  difficulty: number
}

const Difficulty: React.FC<Props> = ({ dispatch, difficulty }) => {
  return (
    <div className='top'>
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
    </div>
  )
}

export default Difficulty
