export const WinnerModal = ({ winner, resetGame }) => {
  if (winner === null) return null

  const winnerText = winner === false ? 'Draw!' : `${winner} Wins`
  return (
    <section className='winner'>
      <div className='text'>
        <h2>
          {winnerText}
        </h2>
        <footer>
          <button onClick={resetGame}>Play again</button>
        </footer>
      </div>
    </section>
  )
}
