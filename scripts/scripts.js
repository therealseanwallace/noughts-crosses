/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
console.log('hello world!');

// Game logic module //

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
    let winner = -1;
    if (!gameArray.includes(0)) {
      winner = 0;
    }
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

    // Map the values of the above object to an array
    const lineArray = Object.keys(lineValues).map((keys) => lineValues[keys]);

    if (lineArray.includes(3)) { // If a line on the board contains 3 like symbols, declare winner
      winner = 1;
      // eslint-disable-next-line no-use-before-define
      display.winnerDeclared(playerArray[0].name);
    } else if (lineArray.includes(12)) {
      winner = 4;
      // eslint-disable-next-line no-use-before-define
      display.winnerDeclared(playerArray[1].name);
    } else if (winner === 0) {
      alert('Game is a draw!');
    }
    return (winner);
  };

  const controlGame = (() => {
    let currentPlayer = false; // false is O
    const idLastPlayer = () => (currentPlayer); // Return the current player
    // eslint-disable-next-line max-len
    const processInput = (square) => { // If move valid, adds player number to relevant array position & returns true
      if (gameArray[square] === 0 && currentPlayer === false) {
        gameArray[square] = 1;
        currentPlayer = !currentPlayer;
        console.log('gameArray[square] = ', gameArray[square]);
        checkWinner();
        return (true);
      } if (gameArray[square] === 0 && currentPlayer === true) {
        gameArray[square] = 4;
        currentPlayer = !currentPlayer;
        console.log('gameArray[square] = ', gameArray[square]);
        checkWinner();
        return (true);
      }
      alert('This square is taken. Please try again');
      return (false);
    };

    const inputOutput = (id) => {
      const result = processInput(id); // Passes the ID of a clicked div to be processed
      return (result); // Returns turn result to display function to update display as appropriate
    };
    return {
      inputOutput,
      idLastPlayer,
    };
  })();

  return {
    checkWinner,
    playerArray,
    controlGame,
  };
})();

// Display and input module //

const display = (() => {
  const modal = document.querySelector('.modal');
  const updateDisplay = (squareId) => {
    const player = game.controlGame.idLastPlayer(); // Gets the ID of the player who last played
    const selectSquare = document.querySelector(`.square${squareId}`);
    if (player === true) { // If player === true, the last player to play was player one
      const nought = document.createElement('img');
      nought.setAttribute('src', 'resources/nought.svg');
      selectSquare.append(nought);
      console.log(selectSquare);
      return ("Display updated with player one's mark");
    }
    const cross = document.createElement('img');
    cross.setAttribute('src', 'resources/cross.svg');
    selectSquare.append(cross);
    console.log(selectSquare);
    return ("Display updated with player two's mark");
  };

  // Takes an on-click event and passes div's ID to game control for processing
  const getInput = (e) => {
    // eslint-disable-next-line prefer-destructuring
    const squareId = e.target.id;
    const result = game.controlGame.inputOutput(squareId);
    if (result === true) { // If last move was valid, update the display
      const displayUpdate = updateDisplay(squareId);
      console.log(displayUpdate);
    }
    console.log(result);
  };
  
  const toggleModal = () => {
    modal.classList.toggle('show-modal');
  };

  const windowOnClick = (e) => {
    if (e.target === modal) {
      toggleModal();
    }
  };

  const createDisplay = () => { // Creates game board divs and adds event listeners
    function makeSquare(i) {
      const gameContainer = document.querySelector('.game-container');
      const modalCloseButton = document.querySelector('.modal-close-button');
      const square = document.createElement('div');
      square.addEventListener('click', getInput);
      window.addEventListener('click', windowOnClick);
      modalCloseButton.addEventListener('click', toggleModal);
      square.classList.add('square', `square${i}`);
      square.setAttribute('id', i);
      gameContainer.append(square);
    }
    for (let i = 0; i < 9; i += 1) {
      makeSquare(i);
    }
  };

  const winnerDeclared = (winner) => {
    console.log("Winner declared!");
    const selectSquares = document.querySelectorAll('.square');
    selectSquares.forEach((square) => square.removeEventListener('click', getInput));
    const selectModalContent = document.querySelector('.modal-content');
    const newH2 = document.createElement('h2');
    newH2.textContent = `${winner} is the winner!`;
    selectModalContent.append(newH2);
    modal.classList.toggle('show-modal');
  };

  const resetGame = () => {
    location.reload();
  };

  createDisplay();
  return {
    winnerDeclared,
    resetGame,
    toggleModal,
  };
})();
