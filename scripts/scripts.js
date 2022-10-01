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
      display.winnerDeclared(playerArray[0].name);
    } else if (lineArray.includes(12)) {
      winner = 4;
      display.winnerDeclared(playerArray[1].name);
    } else if (winner === 0) {
      display.winnerDeclared(false);
    }
    return (winner);
  };

  const controlGame = (() => {
    let currentPlayer = false; // false is O
    const idLastPlayer = () => (currentPlayer); // Return the current player
    const processInput = (square) => { // If move valid, adds player number to relevant array position & returns true
      if (gameArray[square] === 0 && currentPlayer === false) {
        gameArray[square] = 1;
        currentPlayer = !currentPlayer;
        checkWinner();
        return (true);
      } if (gameArray[square] === 0 && currentPlayer === true) {
        gameArray[square] = 4;
        currentPlayer = !currentPlayer;
        checkWinner();
        return (true);
      }
      checkWinner();
      return (false);
    };

    const inputOutput = (id) => {
      const result = processInput(id); // Passes the ID of a clicked div to be processed
      return (result); // Returns turn result to display function to update display as appropriate
    };

    return {
      inputOutput,
      idLastPlayer,
      processInput,
    };
  })();

  const updateNames = () => {
    const selectP1 = document.querySelector('#name1');
    const selectP2 = document.querySelector('#name2');
    playerArray[0].name = selectP1.value;
    playerArray[1].name = selectP2.value;
  };

  return {
    checkWinner,
    playerArray,
    controlGame,
    updateNames,
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
      return (0);
    }
    const cross = document.createElement('img');
    cross.setAttribute('src', 'resources/cross.svg');
    selectSquare.append(cross);
    return (1);
  };

  // Takes an on-click event and passes div's ID to game control for processing
  const getInput = (e) => {
    const squareId = e.target.id;
    const result = game.controlGame.inputOutput(squareId);
    if (result === true) { // If last move was valid, update the display
      const displayUpdate = updateDisplay(squareId);
    }
  };

  const toggleModal = () => {
    modal.classList.toggle('show-modal');
  };

  const windowOnClick = (e) => {
    if (e.target === modal) {
      toggleModal();
    }
  };

  const resetGame = () => {
    location.reload();
  };

  const startGame = () => {
    const squares = document.querySelectorAll('.square');
    for (let i = 0; i < squares.length - 1; i += 1) {
      squares[i].addEventListener('click', getInput);
    }
    game.updateNames();
  };

  const resetButton = document.createElement('input');
  resetButton.setAttribute('type', 'button');
  resetButton.setAttribute('value', 'Reset game');
  resetButton.classList.add('button');
  resetButton.addEventListener('click', resetGame);

  const createDisplay = () => { // Creates game board divs, buttons and adds event listeners
    function makeSquare(i) {
      const gameGrid = document.querySelector('.game-grid');
      const modalCloseButton = document.querySelector('.modal-close-button');
      const square = document.createElement('div');
      window.addEventListener('click', windowOnClick);
      modalCloseButton.addEventListener('click', toggleModal);
      square.classList.add('square', `square${i}`);
      square.setAttribute('id', i);
      gameGrid.append(square);
    }
    for (let i = 0; i < 9; i += 1) {
      makeSquare(i);
    }
    const resetButton2 = document.createElement('input');
    resetButton2.setAttribute('type', 'button');
    resetButton2.setAttribute('value', 'Reset game');
    resetButton2.classList.add('button', 'reset-button');
    resetButton2.addEventListener('click', resetGame);
    const startButton = document.createElement('input');
    startButton.setAttribute('type', 'button');
    startButton.setAttribute('value', 'Start Game');
    startButton.classList.add('button');
    startButton.addEventListener('click', startGame);
    const gameContainer = document.querySelector('.game-container');
    const br = document.createElement('br');
    gameContainer.prepend(resetButton2);
    gameContainer.prepend(br);
    gameContainer.prepend(startButton);
    const form = document.createElement('form');
    const form2 = document.createElement('form');
    const nameInput = document.createElement('input');
    const nameInput2 = document.createElement('input');
    const prompt = document.createElement('p');
    const prompt2 = document.createElement('p');
    prompt.textContent = 'Enter Player Two name';
    prompt2.textContent = 'Enter Player One name';
    nameInput.setAttribute('type', 'text');
    nameInput2.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name2');
    nameInput2.setAttribute('id', 'name1');
    form.append(nameInput);
    form2.append(nameInput2);
    gameContainer.prepend(form);
    gameContainer.prepend(prompt);
    gameContainer.prepend(form2);
    gameContainer.prepend(prompt2);
  };

  const winnerDeclared = (winner) => {
    const selectSquares = document.querySelectorAll('.square');
    selectSquares.forEach((square) => square.removeEventListener('click', getInput));
    const selectModalContent = document.querySelector('.modal-content');
    const newH2 = document.createElement('h2');
    if (winner !== false) {
      newH2.textContent = `Congratulations ${winner}! You won!`;
    } else {
      newH2.textContent = 'This round is a draw.';
    }
    selectModalContent.append(newH2);
    selectModalContent.append(resetButton);
    modal.classList.toggle('show-modal');
  };

  createDisplay();
  return {
    winnerDeclared,
    resetGame,
    toggleModal,
  };
})();
