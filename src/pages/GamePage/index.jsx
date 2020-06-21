import React from "react";
import "./GamePage.css";
import { Card } from "../../components";

const GamePage = ({ deck = [], onReset, onClick }) => (
  <div className="deck">
    {deck.map((card, i) => (
      <Card key={i} number={i} {...card} onClick={onClick} />
    ))}
    <button onClick={onReset}>Reset</button>
  </div>
);

export default GamePage;
