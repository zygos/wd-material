export const createBoard = (rows, columns) => Array(rows)
  .fill(null)
  .map(() => Array(columns).fill(null))

export const isBoardFull = board => board
  .every(row => row.every(cell => cell !== null))
