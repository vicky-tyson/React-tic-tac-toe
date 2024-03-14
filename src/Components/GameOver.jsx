export default function GameOver({win, onRematch}) {
  return (
    <div id="game-over">
        <h2>Game Over</h2>
        {win && <p>{win} Won</p>}
        {!win && <p>Match Draw</p>}
        <p>
        <button onClick={onRematch}>Rematch</button>
        </p>
    </div>
  )
}
