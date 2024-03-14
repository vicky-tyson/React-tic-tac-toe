import React from 'react';
import { useState } from 'react';

export function PlayerInfo({name, symbol, isActive}){

const [isediting, setEditing] = useState(false);
let [playerName, setName] = useState(name);

function handlePlayerName(){
    setEditing(editing => !editing);
}

function handleNameChange(event){
   setName(event.target.value);
}

let player = <span className="player-name">{playerName}</span>

if (isediting) {
    player = <input className="player-name" onChange={handleNameChange} required value={playerName}></input>
}

  return (
    <>
    <div className="active-player">
        <span id="player" className={isActive ? "active" : undefined}>
            {player}
            <span className="player-symbol">{symbol}</span>
            <button onClick={handlePlayerName}>{isediting ? "Save" : "Edit"}</button>
        </span>
    </div>
    </>
  );
}
