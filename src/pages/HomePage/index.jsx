import React from "react";

const HomePage = ({ startGame, onChangePlayer1Name, player1Name }) => (
  <div>
    <label for="player1">Player 1: </label>
    <input
      onChange={onChangePlayer1Name}
      type="text"
      id="player1"
      value={player1Name}
    ></input>
    <button type="button" onClick={startGame}>
      start playing
    </button>
  </div>
);

export default HomePage;
