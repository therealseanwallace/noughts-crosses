/* eslint-disable no-unused-vars */
console.log('hello world!');

// Game module //

const game = (() => {
  const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const playerArray = [{}, {}];
  const playerFactory = (name, id) => {
    const getInput = (e) => {
      console.log("I got input!", e.target.getAttribute('id'));
      return (e.target.getAttribute('id'));
    };
    return { name, id, getInput };
  };

  const spawnPlayers = (() => {
    for (let i = 0; i < 2; i += 1) {
      let playerId = 0;
      let playerName = '';
      if (i === 0) {
        playerId = 1;
        playerName = 'Player One';
        playerArray[0] = playerFactory(playerName, playerId);
      } else {
        playerId = 4;
        playerName = 'Playe Two';
        playerArray[1] = playerFactory(playerName, playerId);
      }
    }
    console.log(playerArray);
  })();

  // If move is valid, marks the relevant array position with the appropriate number & returns true
  const receiveInput = (player, square) => {
    if (gameArray[square] === 0) {
      gameArray[square] = player;
      return (true);
    }
    return (false);
  };

  // Checks to see if a player has won. If so, returns the number of that player
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
    playerArray,
  };
})();

const display = (() => {
  const createDisplay = () => {
    function makeSquare(i) {
      const gameContainer = document.querySelector('.game-container');
      const square = document.createElement('div');
      square.addEventListener('click', game.playerArray[0].getInput);
      square.classList.add('square');
      square.setAttribute('id', `square${i}`);
      gameContainer.append(square);
    }
    for (let i = 0; i < 9 ; i += 1) {
      makeSquare(i);
    }
  };

  createDisplay();
})();
