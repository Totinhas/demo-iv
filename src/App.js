import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { HomePage, GamePage, SettingsPage } from "./pages";
import { symbols } from "./constants";
import { createDeck, shuffle } from "./utilities";

const allCards = symbols.concat(symbols);

function App() {
  const history = useHistory();
  const createNewDeck = () => createDeck(shuffle(allCards));
  const [deck, setDeck] = useState(createNewDeck());
  const [turn, setTurn] = useState([]);
  const [player, setPlayer] = useState({ name: "Sara", score: 0 });
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
  const startGame = () => {
    history.push("/game");
  };
  const onChangePlayer1Name = (event) => {
    setPlayer({ ...player, name: event.target.value });
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
        setPlayer({ ...player, score: player.score + 1 });
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
  }, [deck, turn, player]);

  // players
  // 1P: name(state), score count(state), game end (* flipped === true)
  // 2P: turn swap

  // home: 1x input -> state, [start game] if input has value
  // highscores: diplay after game end (state)

  // settings:
  // numero de players
  // difficulty level = number of emoji (+counter)

  // stretch: prevent quick tripple click

  return (
    <Switch>
      <Route path="/" exact component={HomePage}>
        <HomePage
          startGame={startGame}
          onChangePlayer1Name={onChangePlayer1Name}
          player1Name={player.name}
        />
      </Route>
      <Route path="/game" exact>
        <GamePage
          deck={deck}
          onClick={onClick}
          onReset={onReset}
          player1Name={player.name}
          player1Score={player.score}
        />
      </Route>
      <Route path="/settings" exact component={SettingsPage} />
    </Switch>
  );
}

export default App;
