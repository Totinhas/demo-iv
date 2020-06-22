import React from "react";
import "./GamePage.css";
import { Card } from "../../components";

const GamePage = ({
  deck = [],
  onReset,
  onClick,
  player1Name,
  player1Score,
}) => (
  <div className="deck">
    <p>
      <strong>Player 1:</strong> {player1Name} <strong>Score:</strong>
      {player1Score}
    </p>
    {deck.map((card, i) => (
      <Card key={i} number={i} {...card} onClick={onClick} />
    ))}

    <button onClick={onReset}>Reset</button>
  </div>
);

export default GamePage;
