export default class HumanPlayer {
  static label = 'Human'

  isExternal = false
  symbol

  constructor(symbol) {
    this.symbol = symbol
  }

  async getMove(boardElement) {
    return new Promise((resolve) => {
      const abortController = new AbortController()

      boardElement.addEventListener('click', (event) => {
        const cell = event.target.closest('.cell')

        if (!cell || cell.innerText) return

        // stop listening for clicks
        abortController.abort()

        resolve({ cell })
      }, { signal: abortController.signal })
    })
  }
}
