import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory } from "react-router-dom";
import { HomePage, GamePage, SettingsPage } from "./pages";
import { defaultSettings, defaultHighScores } from "./constants";
import {
  createDeck,
  createPlayers,
  isGameOver,
  getWinner,
  sortPlayers,
} from "./utilities";

function App() {
  const history = useHistory();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [deck, setDeck] = useState(createDeck(defaultSettings.symbols));
  const [players, setPlayers] = useState(
    createPlayers(defaultSettings.numberOfPlayers)
  );
  const [turn, setTurn] = useState({ currentPlayer: 0, cards: [] });
  const [highScores, setHighScores] = useState(defaultHighScores);
  const onReset = () => {
    setDeck(createDeck(settings.symbols));
    setTurn({ currentPlayer: 0, cards: [] });
    setPlayers(
      players.map((player, index) => {
        return { ...player, score: 0 };
      })
    );
    setGameIsOver(false);
  };
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
    setPlayers(createPlayers(event.target.value));
    setDeck(createDeck(settings.symbols));
    setTurn({ ...turn, currentPlayer: 0, cards: [] });
  };
  const onChangeDifficulty = (event) => {
    setSettings({ ...settings, symbols: event.target.value });
    setDeck(createDeck(event.target.value));
    setPlayers(
      players.map((player, index) => {
        return { ...player, score: 0 };
      })
    );
    setTurn({ ...turn, currentPlayer: 0, cards: [] });
  };

  useEffect(() => {
    if (!gameIsOver) {
      if (deck.length > 0 && isGameOver(deck, players)) {
        // push to highscore
        let newHighScores = highScores.concat([getWinner(players)]);
        newHighScores = sortPlayers(newHighScores);
        newHighScores = newHighScores.slice(0, 3);
        setHighScores(newHighScores);
        setGameIsOver(true);
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
          const updatedPlayers = players.map((player, index) =>
            index === turn.currentPlayer
              ? { ...player, score: player.score + 1 }
              : player
          );
          const sortedPlayers = sortPlayers(updatedPlayers);
          setPlayers(sortedPlayers);
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
    }
  }, [deck, turn, players, highScores, settings, gameIsOver]);

  return (
    <Switch>
      <Route path="/demo-iv" exact component={HomePage}>
        <HomePage
          startGame={startGame}
          onChangePlayers={onChangePlayers}
          players={players}
          highScores={highScores}
        />
      </Route>
      <Route path="/demo-iv/game" exact>
        <GamePage
          deck={deck}
          onClick={onClick}
          onReset={onReset}
          players={players}
          turn={turn}
          gameIsOver={gameIsOver}
        />
      </Route>
      <Route path="/demo-iv/settings" exact>
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
