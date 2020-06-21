import React from "react";
import "./Card.css";

const Card = ({ flipped, onClick, number, symbol, inPlay }) => (
  <div
    className={inPlay ? "card inPlay" : "card"}
    onClick={(self) => {
      if (!flipped) {
        onClick(self);
      }
    }}
    data-number={number}
  >
    {flipped ? symbol : "🃏"}
  </div>
);

export default Card;
