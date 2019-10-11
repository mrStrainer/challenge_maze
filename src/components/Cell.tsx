import React from 'react'

type Props = {
  index: number
  domokun: number
  end: number
  current: number
  lastMove: number
}

const Cell: React.FC<Props> = ({ index, domokun, end, current, lastMove }) =>
  index === current ? (
    <>
      <b>P</b>
      <span key={lastMove} className={`overlay ${lastMove === 0 ? '' : 'err'}`}></span>
    </>
  ) : index === domokun ? (
    <span className='D'>D</span>
  ) : index === end ? (
    <span className='E'>E</span>
  ) : null

export default Cell
