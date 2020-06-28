export const createDeck = (symbols) => {
  const symbolsArray = [...symbols];
  const symbolsDoubled = symbolsArray.concat(symbolsArray);
  const symbolsShuffled = shuffle(symbolsDoubled);
  const deck = symbolsShuffled.map((symbol) => ({
    symbol,
    flipped: false,
    matched: false,
    inPlay: true,
  }));
  return deck;
};

export const shuffle = (arr, inPlace = true) => {
  // shallow copy if not inPlace, modifying the input array otherwise
  const base = inPlace ? arr : [].concat(arr);
  for (let i = arr.length, j; i; ) {
    j = Math.floor(Math.random() * i);
    [base[i], base[j]] = [base[j], base[--i]];
  }
  return base;
};

export const createPlayers = (numOfPlayers) => {
  const players = [];
  for (let i = 0; i < numOfPlayers; i++) {
    players.push({ name: "", score: 0 });
  }
  return players;
};
export const getCardsFlipped = (deck) => {
  return deck.filter((element) => element.flipped);
};

export const isGameOver = (deck, players) => {
  const playersAccumulatedScore = players.reduce(
    (accumulator, player) => accumulator + player.score,
    0
  );

  return playersAccumulatedScore === deck.length / 2;
};

export const getWinner = (players) => {
  const sortedPlayers = players.sort(
    (playerA, playerB) => playerB.score - playerA.score
  );
  return sortedPlayers[0];
};

export const sortPlayers = (players) => {
  const sortedPlayers = players.sort(
    (playerA, playerB) => playerB.score - playerA.score
  );
  return sortedPlayers;
};
