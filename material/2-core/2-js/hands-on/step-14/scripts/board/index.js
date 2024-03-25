import getWinningCells from './getWinningCells.js'
import { columns, rows, winLength } from '../config.js'

const CELL_WON_CLASS = 'winning'

export default class Board {
  boardElement

  constructor(boardElement) {
    this.boardElement = boardElement

    this.reset()
  }

  getWinningCells() {
    return getWinningCells(this.boardElement, winLength)
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
    const cells = rows * columns

    this.boardElement.innerHTML = Array(cells)
      .fill('<div class="cell"></div>')
      .join('')

    this.boardElement.style.setProperty('--columns', columns)
    this.boardElement.style.setProperty('--rows', rows)
  }
}
