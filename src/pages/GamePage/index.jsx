import React from "react";
import "./GamePage.css";
import { Card } from "../../components";

const GamePage = ({ deck = [], onReset, onClick, players, turn }) => (
  <div className="gamePage">
    {players.map((player, index) => (
      <div key={index}>
        <p className={index === turn.currentPlayer ? "selectedPlayer" : ""}>
          <strong>Player {index + 1}:</strong> {player.name}
          <br />
          <strong> Score:</strong> {player.score}
        </p>
      </div>
    ))}

    {deck.map((card, i) => (
      <Card key={i} number={i} {...card} onClick={onClick} />
    ))}

    <button onClick={onReset}>Reset</button>
  </div>
);

export default GamePage;
