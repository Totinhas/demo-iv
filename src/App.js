import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { HomePage, GamePage, SettingsPage } from "./pages";
import {
  createDeck,
  createPlayers,
  isGameOver,
  getWinner,
  sortPlayers,
} from "./utilities";

function App() {
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [turn, setTurn] = useState({ currentPlayer: 0, cards: [] });
  const [players, setPlayers] = useState([]);
  const [highScores, setHighScores] = useState([]);
  const [settings, setSettings] = useState({
    symbols: "🐨🐻🐶🐗🐭🐔🐸🐱🦁🐯🦊🐺🐵🐷🐹🐰",
    numberOfPlayers: 3,
  });
  const onReset = () => setDeck(createDeck(settings.symbols));
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
    setDeck(createDeck(settings.symbols));
    setPlayers(createPlayers(settings.numberOfPlayers));
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
  const onChangeNumber = (event) => {
    setSettings({ ...settings, numberOfPlayers: event.target.value });
    setDeck(createDeck(settings.symbols));
    setPlayers(createPlayers(event.target.value));
  };
  const onChangeDifficulty = (event) => {
    setSettings({ ...settings, symbols: event.target.value });
    setDeck(createDeck(event.target.value));
    setPlayers(createPlayers(event.target.value));
  };

  useEffect(() => {
    console.log("useEffect", deck, turn, players, settings);
    if (deck.length > 0 && isGameOver(deck, players)) {
      // who won?
      console.log(getWinner(players));
      // push to highscore
      let newHighScores = highScores.concat([getWinner(players)]);
      newHighScores = sortPlayers(newHighScores);
      newHighScores = newHighScores.slice(0, 3);
      setHighScores(newHighScores);
      // reset
      setDeck(createDeck(settings.symbols));
      setPlayers(
        players.map((player, index) => {
          return { ...player, score: 0 };
        })
      );
    }
    if (turn.cards.length === 2) {
      if (deck[turn.cards[0]].symbol === deck[turn.cards[1]].symbol) {
        // take cards out of play
        setDeck(
          deck.map((card, i) =>
            i === turn.cards[0] || i === turn.cards[1]
              ? { ...card, inPlay: false }
              : card
          )
        );
        // increment player score
        setPlayers(
          players.map((player, index) =>
            index === turn.currentPlayer
              ? { ...player, score: player.score + 1 }
              : player
          )
        );
        // same player turn
        setTurn({ ...turn, cards: [] });
      } else {
        // blocker
        setDeck(
          deck.map((card, i) => {
            return { ...card, inPlay: false };
          })
        );
        // next player turn
        setTurn({
          ...turn,
          cards: [],
          currentPlayer:
            turn.currentPlayer + 1 < players.length
              ? turn.currentPlayer + 1
              : 0,
        });
        setTimeout(() => {
          console.log("setTimeout", turn);
          // flip back and unblock
          setDeck(
            deck.map((card, i) =>
              i === turn.cards[0] || i === turn.cards[1]
                ? { ...card, flipped: false, inPlay: true }
                : { ...card, inPlay: true }
            )
          );
        }, 1000);
      }
    }
  }, [deck, turn, players, highScores, settings]);

  // settings:
  // numero de players
  // difficulty level = number of emoji (+counter)

  // stretch:
  // opacity only when locked (match)
  // game ends too quickly

  return (
    <Switch>
      <Route path="/" exact component={HomePage}>
        <HomePage
          startGame={startGame}
          onChangePlayers={onChangePlayers}
          players={players}
          highScores={highScores}
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
      <Route path="/settings" exact>
        <SettingsPage
          settings={settings}
          onChangeNumber={onChangeNumber}
          onChangeDifficulty={onChangeDifficulty}
        />
      </Route>
    </Switch>
  );
}

export default App;
