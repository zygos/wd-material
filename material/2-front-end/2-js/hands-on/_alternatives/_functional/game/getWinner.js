export default function getWinner(rules, board) {
  const winningLine = getWinningLine(rules.win, board)

  return winningLine ? winningLine[0] : null
}

export function getWinningLine(winningCount, board) {
  const winningLines = [
    ...getHorizontalLines(winningCount, board),
    ...getVerticalLines(winningCount, board),
    ...getDiagonalLines(winningCount, board),
  ]

  return winningLines
    .find(line => line[0] && line.length >= winningCount) || null
}

function getHorizontalLines(winningCount, board) {
  const lines = [];

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col <= board[row].length - winningCount; col++) {
      const line = board[row].slice(col, col + winningCount);
      if (line.every(cell => cell === line[0])) {
        lines.push(line);
      }
    }
  }

  return lines;
}

function getVerticalLines(winningCount, board) {
  const lines = [];

  for (let col = 0; col < board[0].length; col++) {
    for (let row = 0; row <= board.length - winningCount; row++) {
      const line = [];
      for (let i = 0; i < winningCount; i++) {
        line.push(board[row + i][col]);
      }
      if (line.every(cell => cell === line[0])) {
        lines.push(line);
      }
    }
  }

  return lines;
}

function getDiagonalLines(winningCount, board) {
  const lines = [];

  // Check diagonals starting from top-left corner
  for (let row = 0; row <= board.length - winningCount; row++) {
    for (let col = 0; col <= board[row].length - winningCount; col++) {
      const line = [];
      for (let i = 0; i < winningCount; i++) {
        line.push(board[row + i][col + i]);
      }
      if (line.every(cell => cell === line[0])) {
        lines.push(line);
      }
    }
  }

  // Check diagonals starting from top-right corner
  for (let row = 0; row <= board.length - winningCount; row++) {
    for (let col = board[row].length - 1; col >= winningCount - 1; col--) {
      const line = [];
      for (let i = 0; i < winningCount; i++) {
        line.push(board[row + i][col - i]);
      }
      if (line.every(cell => cell === line[0])) {
        lines.push(line);
      }
    }
  }

  return lines;
}
