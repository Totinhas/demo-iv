import React from "react";
import "./GamePage.css";
import { Card } from "../../components";

const GamePage = ({
  deck = [],
  onReset,
  onClick,
  players,
  turn,
  gameIsOver,
}) => (
  <div className="gamePage">
    {gameIsOver ? (
      <h2 className="game-over">Game over!</h2>
    ) : (
      <h2 className="game-on">Game on!</h2>
    )}

    {players.map((player, index) => (
      <div key={index}>
        <p className={index === turn.currentPlayer ? "selectedPlayer" : ""}>
          <strong>Name:</strong> {player.name}
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
