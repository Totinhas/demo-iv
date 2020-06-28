import React from "react";
import "./HomePage.css";

const HomePage = ({ startGame, onChangePlayers, players, highScores }) => (
  <div className="homePage">
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
    <h2>
      <span role="img" aria-label="star icon">
        ⭐
      </span>{" "}
      High Scores
      <span role="img" aria-label="star icon">
        {" "}
        ⭐
      </span>
    </h2>
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
