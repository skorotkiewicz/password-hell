export const gamesList = [
  { title: "Euro Track Simulator 2", keys: 507, id: "7UKbURnqfCUw" },
  { title: "DiRT 4", keys: 473, id: "0pfZkZ7R8CZs" },
  { title: "Destiny 2", keys: 59, id: "Xo09iOkyw7vP" },
  { title: "Terraria", keys: 618, id: "vLmNQm5yft0b" },
  { title: "Widelands", keys: 1706, id: "khKzDbzk8TE1" },
  { title: "Xonotic", keys: 1031, id: "kNTC8eLVLpqt" },
  { title: "Grand Theft Auto 5", keys: 0, id: "LWEqOodUF2Pg" },
  { title: "Elden Ring", keys: 0, id: "N3yTX9edNnbf" },
];

export const Games = (gameId: string) => {
  if (gameId) return gamesList.find((x) => x.id === gameId);
};
