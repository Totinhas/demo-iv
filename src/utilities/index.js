export const createDeck = (symbols) =>
  symbols.map((symbol) => ({
    symbol,
    flipped: false,
    matched: false,
    inPlay: true,
  }));

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
