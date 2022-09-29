console.log('hello world!');
// Game module //
const game = (() => {
  let gameArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const receiveInput = (player, square) => {
    if (gameArray[square] === 0) {
      gameArray[square] = player;
      return (true);
    } else {
      return (false);
    }
  };
  
  const checkWinner = () => {
    const horiz0 = array[0] + array[1] + array[2];
    const horiz1 = array[3] + array[4] + array[5];
    const horiz2 = array[6] + array[7] + array[8];
    const vert0 = array[0] + array[3] + array[6];
    const vert1 = array[1] + array[4] + array[7];
    const vert2 = array[2] + array[5] + array[8];
    const diag0 = array[0] + array[4] + array[8];
    const diag1 = array[6] + array[4] + array[2];

    switch(3) {
      case ()
    }
  };
  return {
    receiveInput,
    checkWinner,
  };
})();
