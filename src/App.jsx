import { useState } from 'react'

const TURNS = { x: '✖️', o: '⭕' }

const Square = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    // cosas
    updateBoard({ index })
  }

  return (
    <div onClick={handleClick} className='square'>
      {children}
    </div>
  )
}

const initialBoard = Array(9).fill(null)
const initialTurn = TURNS.x

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App () {
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState(initialTurn)
  const [winner, setWinner] = useState(null)
  // null = none, false = draw, true = winner

  const resetGame = () => {
    setBoard(initialBoard)
    setTurn(initialTurn)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
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

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every(square => square !== null)
  }

  const updateBoard = ({ index }) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

    // TODO check is game is over

    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)
  }

  return (
    <main className='board'>
      <h1>TicTacToe</h1>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <h1>
          {turn} Turn!
        </h1>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'Empate' : `Ganó: ${winner}`
                }
              </h2>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
