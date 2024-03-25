document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.board').addEventListener('click', handleBoardClick)

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

function handleBoardClick(event) {
  const cell = event.target.closest('.cell')

  if (!cell || cell.innerText) return

  const boardElement = event.currentTarget
  const gameElement = boardElement.closest('.game')

  if (gameElement.classList.contains('game-over')) return

  cell.innerText = 'X'

  const statusElement = document.querySelector('.game-status')
  const winningCellsX = getWinningCells(boardElement, 'X')

  if (winningCellsX) {
    highlightCells(winningCellsX)
    statusElement.innerText = 'X won!'
    gameElement.classList.add('game-over')
    return
  }

  const cellsEmpty = document.querySelectorAll('.cell:empty')

  if (cellsEmpty.length === 0) {
    statusElement.innerText = 'Draw!'
    gameElement.classList.add('game-over')
    return
  }

  const cellRandom = cellsEmpty[Math.floor(Math.random() * cellsEmpty.length)]

  cellRandom.innerText = 'O'

  const winningCellsO = getWinningCells(boardElement, 'O')

  if (winningCellsO) {
    highlightCells(winningCellsO)
    statusElement.innerText = 'O won!'
    gameElement.classList.add('game-over')
    return
  }
}

function getWinningCells(boardElement, symbol) {
  const winningCombinations = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal
    [0, 4, 8],
    [2, 4, 6],
  ]

  const cells = boardElement.querySelectorAll('.cell')

  // map each cell index to the cell element in DOM
  const cellsCombinations = winningCombinations
    .map(combination => combination.map(index => cells[index]))

  // find a combination where every cell is either X or O
  return cellsCombinations
    .find(combination => combination
      .every(cell => cell.innerText === symbol))
}

function highlightCells(cells) {
  cells.forEach(cell => cell.classList.add('winning'))
}
