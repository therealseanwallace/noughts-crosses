console.log('hello world!');

// Game module //

const game = (() => {
  const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const receiveInput = (player, square) => {
    if (gameArray[square] === 0) {
      gameArray[square] = player;
      return (true);
    }
    return (false);
  };

  const checkWinner = () => {
    const lineValues = {
      horiz0: gameArray[0] + gameArray[1] + gameArray[2],
      horiz1: gameArray[3] + gameArray[4] + gameArray[5],
      horiz2: gameArray[6] + gameArray[7] + gameArray[8],
      vert0: gameArray[0] + gameArray[3] + gameArray[6],
      vert1: gameArray[1] + gameArray[4] + gameArray[7],
      vert2: gameArray[2] + gameArray[5] + gameArray[8],
      diag0: gameArray[0] + gameArray[4] + gameArray[8],
      diag1: gameArray[6] + gameArray[4] + gameArray[2],
    };

    // eslint-disable-next-line arrow-body-style
    const lineArray = Object.keys(lineValues).map((keys) => { return lineValues[keys]; });
    let winner = 0;

    if (lineArray.includes(3)) {
      winner = 1;
    } else if (lineArray.includes(12)) {
      winner = 4;
    }
    return (winner);
  };

  return {
    receiveInput,
    checkWinner,
  };
})();
