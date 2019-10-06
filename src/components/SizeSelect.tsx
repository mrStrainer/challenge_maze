import React from 'react'

const sizes = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

const SizeOptions = sizes.map(size => (
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
    <>
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
    </>
  )
}

export default SizeSelect
