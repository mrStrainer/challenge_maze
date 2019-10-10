import React from 'react'
import { SIZES } from '../constants'

const SizeOptions = SIZES.map(size => (
  <option key={size} value={size}>
    {size}
  </option>
))

type Props = {
  dispatch: React.Dispatch<any>
  width: number
  height: number
}

const SizeSelect: React.FC<Props> = ({ dispatch, width, height }) => {
  return (
    <div className='top'>
      <label htmlFor='width'>
        Width:
        <select
          name='width'
          id='width'
          value={width}
          onChange={e =>
            dispatch({
              type: 'SELECT_WIDTH',
              payload: e.target.value
            })
          }
        >
          {SizeOptions}
        </select>
      </label>
      <label htmlFor='height'>
        Height:
        <select
          name='height'
          id='height'
          value={height}
          onChange={e =>
            dispatch({
              type: 'SELECT_HEIGHT',
              payload: e.target.value
            })
          }
        >
          {SizeOptions}
        </select>
      </label>
    </div>
  )
}

export default SizeSelect
