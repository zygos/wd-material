let board = createBoard()

export function getBoard() {
  return board
}

function createBoard() {
  return Array(3)
    .fill()
    .map(() => Array(3).fill(null))
}

export function isDraw() {
  return board
    .every(row => row
      .every(cell => cell !== null))
}

export function setMoveInBoard(sign, row, column) {
  board[row][column] = sign
}

export function isGameOver() {
  return isDraw() || !!getWinner()
}

export function getWinner() {
  const rows = board
    .map(row => row.map((_, index) => row[index]))

  const columns = board
    .map((_, index) => board.map(row => row[index]))

  const diagonals = [
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ]

  const lines = [...rows, ...columns, ...diagonals]

  const winner = lines
    .find(line => line[0] && line.every(sign => sign === line[0]))

  return winner ?? null
}

export function resetBoard() {
  board = createBoard()
}
