import { Directions } from "../types"
import { borders, directions } from "../constants"

//https://ponychallenge.trustpilot.com/pony-challenge/eW91X3NhdmVkX3RoZV9wb255.jpg

export function getImageUrl(image: string) {
  return `https://ponychallenge.trustpilot.com/${image}`
}

export const getValidMoves = (cells: Directions[][], rowLength: number) => {
  const maxIndex = cells.length - 1
  return cells.map((cell, index) => {
    let validMoves = borders.filter(b => !cell.includes(b))
    if (index < maxIndex - rowLength + 1 && !cells[index + 15].includes(directions.north)) {
      validMoves.push(directions.south)
    }
    if (!(index % rowLength === rowLength - 1) && !cells[index + 1].includes(directions.west)) {
      validMoves.push(directions.east)
    }
    return validMoves
  })
}