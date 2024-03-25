import getWinningCells from './getWinningCells.js'

const CELL_WON_CLASS = 'winning'

export default class Board {
  boardElement
  winLength

  constructor(boardElement, winLength) {
    this.boardElement = boardElement
    this.winLength = winLength

    this.reset()
  }

  getWinningCells() {
    return getWinningCells(this.boardElement, this.winLength)
  }

  isFull() {
    return this.boardElement.querySelectorAll('.cell:empty').length === 0
  }

  markCell(cell, symbol) {
    cell.innerText = symbol
  }

  markCellsWon(cells) {
    cells.forEach(cell => cell.classList.add(CELL_WON_CLASS))
  }

  reset() {
    this.boardElement
      .querySelectorAll('.cell')
      .forEach((cell) => {
        cell.innerText = ''
        cell.classList.remove(CELL_WON_CLASS)
      })
  }
}
