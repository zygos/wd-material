export default class Game {
  #playerIndex = -1
  #gameElement = null
  #players = []

  constructor(gameElement, players) {
    this.#gameElement = gameElement
    this.#players = players

    this.reset()
  }

  get playerCurrent() {
    return this.#players[this.#playerIndex]
  }

  declareDraw() {
    this.#setStatusMessage('Draw')
  }

  declareWinner() {
    const { symbol } = this.playerCurrent

    this.#setStatusMessage(`Winner is ${symbol}`)
  }

  nextPlayer() {
    this.#playerIndex = (this.#playerIndex + 1) % this.#players.length

    this.#updatePlayerStatus()

    return this.playerCurrent
  }

  #updatePlayerStatus() {
    const { isExternal, symbol } = this.playerCurrent

    const message = isExternal
      ? `${symbol} is thinking... 🤔`
      : `It is "${symbol}" turn. Click on a cell to mark it.`

    this.#setStatusMessage(message)
  }

  #setStatusMessage(message) {
    const messageElement = this.#gameElement.querySelector('.status-message')

    messageElement.innerText = message
  }

  setPlayerComment(comment) {
    const commentElement = this.#gameElement.querySelector('.comment')

    if (!comment) {
      commentElement.innerText = ''
      return
    }

    const { symbol } = this.playerCurrent

    commentElement.innerText = `${symbol}: ${comment}`
  }

  reset() {
    this.#setStatusMessage('')
    this.setPlayerComment(null)
    this.#gameElement.classList.remove('not-ready')
    this.#playerIndex = -1
  }
}
