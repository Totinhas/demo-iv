import React from "react";

const HomePage = ({ startGame, onChangePlayers, players, highScores }) => (
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

    {highScores.map((player, index) => (
      <div key={index}>
        <p>
          {" "}
          name: {player.name}
          <br />
          score: {player.score}
        </p>
      </div>
    ))}
  </div>
);

export default HomePage;
