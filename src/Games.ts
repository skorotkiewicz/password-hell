const Games = (gameId: string | undefined) => {
  switch (gameId) {
    case "7UKbURnqfCUw":
      return "Euro Track Simulator 2";
    case "0pfZkZ7R8CZs":
      return "DiRT 4";
    case "Xo09iOkyw7vP":
      return "Destiny 2";

    case "vLmNQm5yft0b":
      return "Terraria";

    default:
      return false;
  }
};

export default Games;
