import { winnerCombos } from '../constants.js'

export const checkWinner = (boardToCheck) => {
  // revisamos todas las combinaciones ganadoras
  // para ver si X u O ganó
  for (const combo of winnerCombos) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }
  // si no hay ganador
  return null
}

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every(square => square !== null)
}
