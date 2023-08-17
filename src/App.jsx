import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square'
import { TURNS, initialBoard, initialTurn } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal'

function App () {
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState(initialTurn)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(initialBoard)
    setTurn(initialTurn)
    setWinner(null)
  }

  const updateBoard = ({ index }) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
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

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
