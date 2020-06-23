import React from "react";

const HomePage = ({ startGame, onChangePlayers, players }) => (
  <div>
    {players.map((player, index) => (
      <div key={index}>
        <label>Player {index + 1}: </label>
        <input
          onChange={onChangePlayers}
          type="text"
          value={player.name}
          data-id={index}
        ></input>
      </div>
    ))}

    <button type="button" onClick={startGame}>
      start playing
    </button>
  </div>
);

export default HomePage;
