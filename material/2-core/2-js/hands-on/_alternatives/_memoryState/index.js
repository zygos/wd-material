import { getBoard, isGameOver, isDraw, getWinner, resetBoard, setMoveInBoard } from './board.js'
import { getCells, isDisabled, setCellSign } from './cells.js'
import { getAutoMove } from './opponent.js'
import { setMessage } from './message.js'

const USER_SIGN = 'X'
const AI_SIGN = 'O'

function handleClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell || isDisabled(cell)) return

  makeMove(USER_SIGN, cell.dataset)
  makeMove(AI_SIGN, getAutoMove(getBoard()))
}

function makeMove(sign, { row, column }) {
  if (isGameOver()) return

  setMoveInBoard(sign, row, column)
  setCellSign(sign, row, column)

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

  getCells().forEach((cell) => {
    cell.innerText = ''
    cell.classList.remove('disabled')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#board').addEventListener('click', handleClick)
  document.querySelector('#reset').addEventListener('click', resetGame)
})
