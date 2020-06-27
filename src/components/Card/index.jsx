import React from "react";
import "./Card.css";

const Card = ({ flipped, onClick, number, symbol, inPlay }) => {
  const clickable = !flipped && inPlay;
  return (
    <div
      className={clickable ? "card inPlay" : "card"}
      onClick={(self) => {
        if (clickable) {
          onClick(self);
        }
      }}
      data-number={number}
    >
      {flipped ? symbol : "🃏"}
    </div>
  );
};

export default Card;
