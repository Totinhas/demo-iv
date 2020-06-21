import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { HomePage, GamePage, SettingsPage } from "./pages";
import { symbols } from "./constants";
import { createDeck, shuffle, getCardsFlipped } from "./utilities";

const allCards = symbols.concat(symbols);

function App() {
  const createNewDeck = () => createDeck(shuffle(allCards));
  const [deck, setDeck] = useState(createNewDeck());
  const [turn, setTurn] = useState([]);
  const onReset = () => setDeck(createNewDeck());
  const onClick = (e) => {
    const clickedCard = +e.target.dataset.number;
    setDeck(
      deck.map((card, i) =>
        i !== clickedCard ? card : { ...card, flipped: !card.flipped }
      )
    );
    setTurn(turn.concat([clickedCard]));
  };

  useEffect(() => {
    console.log("useEffect", turn);
    if (turn.length === 2) {
      if (deck[turn[0]].symbol === deck[turn[1]].symbol) {
        setDeck(
          deck.map((card, i) =>
            i === turn[0] || i === turn[1] ? { ...card, inPlay: false } : card
          )
        );
        setTurn([]);
      } else {
        setTimeout(() => {
          console.log("setTimeout", turn);
          setDeck(
            deck.map((card, i) =>
              i === turn[0] || i === turn[1]
                ? { ...card, flipped: false }
                : card
            )
          );
          setTurn([]);
        }, 1000);
      }
    }
  }, [deck, turn]);

  // home: 1x input -> state, [start game] if input has value
  // highscores: diplay after game end (state)

  // players
  // 1P: name(state), score count(state), game end (* flipped === true)
  // 2P: turn swap

  // settings:
  // numero de players
  // difficulty level

  // stretch: prevent quick tripple click

  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/game" exact>
        <GamePage deck={deck} onClick={onClick} onReset={onReset} />
      </Route>
      <Route path="/settings" exact component={SettingsPage} />
    </Switch>
  );
}

export default App;
