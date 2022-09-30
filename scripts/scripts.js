/* eslint-disable no-unused-vars */
console.log('hello world!');

// Game module //

const game = (() => {
  const gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const playerArray = [{}, {}];

  const playerFactory = (name, id) => ({ name, id });

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
        playerName = 'Player Two';
        playerArray[1] = playerFactory(playerName, playerId);
      }
    }
    console.log(playerArray);
  })();

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
      console.log('Winner is Player One!');
    } else if (lineArray.includes(12)) {
      winner = 4;
      console.log('Winner is Player Two!');
    }
    return (winner);
  };

  const controlGame = (() => {
    // If move valid, marks relevant array position with appropriate number & returns true
    let currentPlayer = false; // false is "Player one"/playerArray[0]
    const processInput = (square) => {
      if (gameArray[square] === 0 && currentPlayer === false) {
        gameArray[square] = 1;
        currentPlayer = !currentPlayer;
        console.log("gameArray[square] = ", gameArray[square]);
        checkWinner();
        return (true);
      } if (gameArray[square] === 0 && currentPlayer === true) {
        gameArray[square] = 4;
        currentPlayer = !currentPlayer;
        console.log("gameArray[square] = ", gameArray[square]);
        checkWinner();
        return (true);
      }
      console.log('This square is taken. Please try again')
      return (false);
    };

    const getInput = (e) => {
      processInput(e.target.id);
      console.log("Receive input", e, "Sending input to handler");
    };
    return {
      getInput,
    };
  })();

  return {
    checkWinner,
    playerArray,
    controlGame,
  };
})();

const display = (() => {
  const createDisplay = () => {
    function makeSquare(i) {
      const gameContainer = document.querySelector('.game-container');
      const square = document.createElement('div');
      square.addEventListener('click', game.controlGame.getInput);
      square.classList.add('square');
      square.setAttribute('id', i);
      gameContainer.append(square);
    }
    for (let i = 0; i < 9; i += 1) {
      makeSquare(i);
    }
  };
  createDisplay();
})();
