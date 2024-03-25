import { createBoard, isBoardFull } from './board.js'
import getWinner from './getWinner.js'
import render from './render.js'

export default async function playGame(rules, players, gameElement) {
  let board = createBoard(rules.rows, rules.columns)
  let playerIndex = 0
  let winner = null
  let isDraw = false

  render(board, null, false, gameElement)

  // a pure functional approach would be to use a reduce function
  // but for the sake of readability, I'll use a while loop
  while (winner === null && !isDraw) {
    const player = players[playerIndex]
    const move = await player.getMove(board, gameElement)

    board = makeMove(board, player.sign, move)
    playerIndex = (playerIndex + 1) % players.length
    isDraw = isBoardFull(board)
    winner = getWinner(rules, board)

    render(board, winner, isDraw, gameElement)
  }
}

export function makeMove(board, sign, { row, column }) {
  if (board[row][column] !== null) return board

  // mutation
  board[row][column] = sign

  return board
}
