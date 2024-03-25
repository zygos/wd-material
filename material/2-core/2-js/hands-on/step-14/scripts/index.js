import playersOptions from './players/index.js'
import Game from './game.js'
import Board from './board/index.js'
import useErrors from './errors.js'
import useOptions from './options/index.js'

document.addEventListener('DOMContentLoaded', () => {
  // allows us to play multiple games on the same page
  const gameElements = document.querySelectorAll('.game')

  gameElements.forEach(tikTacToe)
})

async function tikTacToe(gameElement) {
  const boardElement = gameElement.querySelector('.board')

  const { displayError, clearError } = useErrors(
    gameElement.querySelector('.game-error'),
  )

  const { getSelectedPlayers, hideOptions, showOptions } = useOptions(
    gameElement.querySelector('.game-options'),
    playersOptions
  )

  gameElement
    .querySelector('.game-start')
    .addEventListener('click', async () => {
      try {
        const players = getSelectedPlayers()
        const game = new Game(gameElement, players)
        const board = new Board(boardElement)

        hideOptions()
        clearError()
        await play(game, board, boardElement)
      } catch (error) {
        displayError(error)
      } finally {
        showOptions()
      }
    })
}

async function play(game, board, boardElement) {
  while (!board.getWinningCells() && !board.isFull()) {
    const player = game.nextPlayer()
    const { cell, comment } = await player.getMove(boardElement)

    board.markCell(cell, player.symbol)

    if (comment) game.setPlayerComment(comment)
  }

  const winningCells = board.getWinningCells()

  if (winningCells) {
    game.declareWinner()
    board.markCellsWon(winningCells)
  } else if (board.isFull) {
    game.declareDraw()
  }
}
