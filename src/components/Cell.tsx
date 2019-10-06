import React from 'react'

const Cell = ({
  index,
  domokun,
  end,
  current,
  keyPressed
}: {
  index: number
  domokun: number
  end: number
  current: number
  keyPressed: { key: string; last: number }
}) => {
  return index === current ? (
    <>
      <span key={Date.now()} className={`overlay ${keyPressed.last === 0 ? '' : 'err'}`}></span>
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
