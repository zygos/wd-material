document.addEventListener('DOMContentLoaded', async () => {
  document.querySelector('#board').addEventListener('click', handleBoardClick)
  await playGame();
})

const playerOptions = [
  {
    makeMove: async (board, cellClick) => {
      const cell = await cellClick;
      return cell;
    },
  },
  {
    makeMove: async (board) => {
      const emptyCells = getEmptyCells(board);
      return emptyCells[Math.floor(Math.random() * emptyCells.length)];
    },
  },
  // Add more players if needed
];

const playerSlots = [{ sign: 'X' }, { sign: 'O' }];
const players = playerSlots.map((slot, index) => ({
  ...playerOptions[index % playerOptions.length],
  ...slot,
}));

let currentPlayerIndex = 0;

async function handleBoardClick(event) {
  const cell = event.target;
  const board = document.querySelector('#board');
  const currentPlayer = players[currentPlayerIndex];

  if (currentPlayer.makeMove.length === 2) {
    const selectedCell = await currentPlayer.makeMove(board, Promise.resolve(cell));
    if (selectedCell) {
      makeMove(selectedCell, currentPlayer.sign);
    }
  }
}

async function playGame() {
  while (!getWinner() && !isBoardFull()) {
    const board = document.querySelector('#board');
    const currentPlayer = players[currentPlayerIndex];

    if (currentPlayer.makeMove.length === 1) {
      const selectedCell = await currentPlayer.makeMove(board);
      makeMove(selectedCell, currentPlayer.sign);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  const winner = getWinner();
  if (winner) {
    alert(`${winner} won!`);
  } else {
    alert('Draw!');
  }
}

function makeMove(cell, sign) {
  if (cell && cell.classList.contains('cell') && cell.innerText === '') {
    cell.innerText = sign;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }
}

function getWinner() {
  const cells = document.querySelectorAll('.cell')

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const line of lines) {
    const [a, b, c] = line

    if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
      return cells[a].innerText
    }
  }

  return null
}

function isBoardFull() {
  return getEmptyCells().length === 0;
}

function getEmptyCells() {
  return document.querySelectorAll('.cell:empty');
}
