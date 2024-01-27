import getWinningCells from './getWinningCells.js'

let isWaiting = false
let currentSymbol = 'X'
let gameMode = 'HA'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.board').addEventListener('click', handleBoardClick)

  document.querySelector('.game-mode').addEventListener('click', event => {
    gameMode = event.target.dataset.mode
  })

  document.querySelector('.restart').addEventListener('click', event => {
    const gameElement = event.target.closest('.game')

    gameElement.classList.remove('game-over')

    gameElement.querySelector('.game-status').innerText = ''

    gameElement
      .querySelectorAll('.board .cell')
      .forEach((cell) => {
        cell.innerText = ''
        cell.classList.remove('winning')
      })
  })
})

async function handleBoardClick(event) {
  if (isWaiting) return

  const cell = event.target.closest('.cell')

  if (!cell || cell.innerText) return

  const boardElement = event.currentTarget
  const gameElement = boardElement.closest('.game')

  if (gameElement.classList.contains('game-over')) return

  cell.innerText = currentSymbol

  const statusElement = gameElement.querySelector('.game-status')
  const winningCells = getWinningCells(boardElement, currentSymbol)

  if (winningCells) {
    highlightCells(winningCells)
    statusElement.innerText = `${currentSymbol} won!`
    gameElement.classList.add('game-over')
    return
  }

  if (gameMode === 'HH') {
    currentSymbol = currentSymbol === 'X' ? 'O' : 'X'
  } else if (gameMode === 'HA') {
    isWaiting = true

    await pause(500)

    const cellsEmpty = gameElement.querySelectorAll('.cell:empty')
    const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

    cellRandom.innerText = 'O'

    // move is done, we can set isWaiting to false
    isWaiting = false

    const winningCellsO = getWinningCells(boardElement, 'O')

    if (winningCellsO) {
      highlightCells(winningCellsO)
      statusElement.innerText = 'O won!'
      gameElement.classList.add('game-over')
      return
    }
  }

  // moved the draw logic here, we are querying for empty cells again, because 'O' made a move
  // we could also check for the length being 1, but this is more explicit
  const cellsEmptyRemaining = gameElement.querySelectorAll('.cell:empty')

  if (cellsEmptyRemaining.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }
}

function highlightCells(cells) {
  cells.forEach(cell => cell.classList.add('winning'))
}

function pause(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
