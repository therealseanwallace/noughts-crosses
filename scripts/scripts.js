console.log('hello world!');
// Game module //
const game = (() => {
  let gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const receiveInput = (square) => {
    if (gameArray[square] !== 1) {
      gameArray[square] = 1;
      return (true);
    } else {
      return (false);
    }
  };

  return {
    receiveInput,
  };
})();
