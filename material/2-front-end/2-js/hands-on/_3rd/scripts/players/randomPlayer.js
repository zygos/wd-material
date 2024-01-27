const MOVE_DELAY_MS = 500

export default class RandomPlayer {
  // property accessable without creating an instance of the class
  static label = 'Random AI'

  // instance properties
  isExternal = true
  symbol

  constructor(symbol) {
    this.symbol = symbol
  }

  async getMoveCell(boardElement) {
    await waitFor(MOVE_DELAY_MS)

    const cellsEmpty = getEmptyCells(boardElement)

    return { cell: getRandomItem(cellsEmpty) }
  }
}

const waitFor = ms =>
  new Promise(resolve => setTimeout(resolve, ms))

const getEmptyCells = boardElement =>
  boardElement.querySelectorAll('.cell:empty')

const getRandomItem = array =>
  array[Math.floor(Math.random() * array.length)]
