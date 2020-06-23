import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { HomePage, GamePage, SettingsPage } from "./pages";
import { symbols } from "./constants";
import { createDeck, shuffle, createPlayers } from "./utilities";

const allCards = symbols.concat(symbols);

function App() {
  const history = useHistory();
  const createNewDeck = () => createDeck(shuffle(allCards));
  const [deck, setDeck] = useState(createNewDeck());
  const [turn, setTurn] = useState({ currentPlayer: 0, cards: [] });
  const [players, setPlayers] = useState(createPlayers(2));
  const onReset = () => setDeck(createNewDeck());
  const onClick = (e) => {
    const clickedCard = +e.target.dataset.number;
    setDeck(
      deck.map((card, i) =>
        i !== clickedCard ? card : { ...card, flipped: !card.flipped }
      )
    );
    setTurn({ ...turn, cards: turn.cards.concat([clickedCard]) });
  };
  const startGame = () => {
    history.push("/game");
  };
  const onChangePlayers = (event) => {
    setPlayers(
      players.map((player, index) =>
        index === parseInt(event.target.dataset.id)
          ? { ...player, name: event.target.value }
          : player
      )
    );
  };

  useEffect(() => {
    console.log("useEffect", turn);
    if (turn.cards.length === 2) {
      if (deck[turn.cards[0]].symbol === deck[turn.cards[1]].symbol) {
        setDeck(
          deck.map((card, i) =>
            i === turn.cards[0] || i === turn.cards[1]
              ? { ...card, inPlay: false }
              : card
          )
        );
        setPlayers(
          players.map((player, index) =>
            index === turn.currentPlayer
              ? { ...player, score: player.score + 1 }
              : player
          )
        );

        setTurn({ ...turn, cards: [] });
      } else {
        setTimeout(() => {
          console.log("setTimeout", turn);
          setDeck(
            deck.map((card, i) =>
              i === turn.cards[0] || i === turn.cards[1]
                ? { ...card, flipped: false }
                : card
            )
          );
          console.log(turn.currentPlayer + 1, players.length);
          setTurn({
            ...turn,
            cards: [],
            currentPlayer:
              turn.currentPlayer + 1 < players.length
                ? turn.currentPlayer + 1
                : 0,
          });
        }, 1000);
      }
    }
  }, [deck, turn, players]);

  // players
  // 1P: name(state), score count(state), game end (* flipped === true)
  // 2P: turn swap
  // player goes again - win

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
          onChangePlayers={onChangePlayers}
          players={players}
        />
      </Route>
      <Route path="/game" exact>
        <GamePage
          deck={deck}
          onClick={onClick}
          onReset={onReset}
          players={players}
          turn={turn}
        />
      </Route>
      <Route path="/settings" exact component={SettingsPage} />
    </Switch>
  );
}

export default App;
