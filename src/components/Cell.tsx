import React from 'react'

const Cell = ({
  index,
  domokun,
  end,
  current,
  lastMove
}: {
  index: number
  domokun: number
  end: number
  current: number
  lastMove: number
}) => {
  return index === current ? (
    <>
      <span key={lastMove} className={`overlay ${lastMove === 0 ? '' : 'err'}`}></span>
      <b>P</b>
    </>
  ) : index === domokun ? (
    <>D</>
  ) : index === end ? (
    <>E</>
  ) : (
    <></>
  )
}

export default Cell
