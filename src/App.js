import { PlayerInfo } from "./Components/PlayerInfo";
import GameBoard from "./Components/GameBoard";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./Components/winning_conditions";
import GameOver from "./Components/GameOver";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function App() {

const [gameTurn, setGameTurn] = useState([])  
const [activePlayer, setActivePlayer] = useState("X");


let gameBoard = [...initialBoard.map(array => [...array])];

for(const turn of gameTurn){
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
}

let winner;
for(const combinations of WINNING_COMBINATIONS){

    const firstSquare   =  gameBoard[combinations[0].row][combinations[0].column];
    const secondSquare  =  gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquare   =  gameBoard[combinations[2].row][combinations[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
       winner = firstSquare;
    }

}

const hasDraw = gameTurn.length === 9 && !winner;

function handleActivePlayer(rowIndex, colIndex){
  setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
  setGameTurn(prevTurns => {

    let currentPlayer = "X";

    if(prevTurns.length > 0 && prevTurns[0].player === "X"){
      currentPlayer = "O";
    }
    const updatedTurns = [{ square : {row : rowIndex, col : colIndex}, 
                            player : currentPlayer},
                            ...prevTurns]
    return updatedTurns;
  });
}

function handleRematch(){
   setGameTurn([]);
   setActivePlayer("X");
}

  return (
    <div className="container">
       <div className="head-part">
         <h2><span className="tic-red">Tic</span> - <span className="tac-blue"> Tac </span> - <span className="toe-orange">Toe</span></h2>
       </div>
       <div id="game-container">
        <div  id="players">
          <PlayerInfo name="Player 1" symbol="X" isActive={activePlayer === "X"}/>
          <PlayerInfo name="Player 2" symbol="O" isActive={activePlayer === "O"}/>
        </div>
        {(winner || hasDraw) && <GameOver win={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectPlayer={handleActivePlayer} board={gameBoard}/>
       </div>
    </div>
  );
}

export default App;
