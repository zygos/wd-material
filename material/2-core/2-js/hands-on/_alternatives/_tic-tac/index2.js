import {
  getBoard, getWinner, isDisabled, isDraw, isGameOver, resetBoard, setMove,
} from './board.js'
import { getAutoMove } from './opponent.js'
import { setMessage } from './message.js'

const USER_SIGN = 'X'
const AI_SIGN = 'O'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#board').addEventListener('click', handleClick)
  document.querySelector('#reset').addEventListener('click', resetGame)
})

function handleClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell || isDisabled(cell)) return

  makeMove(USER_SIGN, cell.dataset)
  makeMove(AI_SIGN, getAutoMove(getBoard()))
}

function makeMove(sign, { row, column }) {
  if (isGameOver()) return

  setMove(sign, row, column)

  const winner = getWinner()

  if (winner) {
    setMessage(`Winner is ${winner}`)
  } else if (isDraw()) {
    setMessage('Draw')
  }
}

function resetGame() {
  resetBoard()
  setMessage('')
}
