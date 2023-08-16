import { useState } from 'react'

const TURNS = { x: '✖️', o: '⭕' }

const Square = ({ children, updateBoard, index }) => {
  const handleClick = () => {
    // cosas
    updateBoard()
  }

  return (
    <div onClick={handleClick} className='square'>
      {children}
    </div>
  )
}

const initialBoard = Array(9).fill(null)
const initialTurn = TURNS.x
const mock = ['✖️', '✖️', '✖️', '✖️', '✖️', '⭕', '⭕', '⭕', '⭕']

function App () {
  const [board, setBoard] = useState(initialBoard)
  const [turn, setTurn] = useState(initialTurn)

  const updateBoard = (/* cosas */) => {
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
    </main>
  )
}

export default App
