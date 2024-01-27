import playersOptions from './players/index.js'
import { formPlayerSelects, getPlayers } from './options.js'
import { playerCount, winLength } from './config.js'
import Game from './game.js'
import Board from './board/index.js'

document.addEventListener('DOMContentLoaded', () => {
  const gameElement = document.querySelector('[data-game]')
  const playerSelects = gameElement.querySelector('[data-player-selects]')

  playerSelects.innerHTML = formPlayerSelects(playersOptions, playerCount)

  gameElement
    .querySelector('[data-start]')
    .addEventListener('click', async () => {
      try {
        const players = getPlayers(playerSelects, playersOptions)
        const boardElement = gameElement.querySelector('[data-board]')

        const game = new Game(gameElement, players)
        const board = new Board(boardElement, winLength)

        await play(game, board, boardElement)
      } catch (error) {
        displayError(gameElement.querySelector('[data-error]'), error)
      }
    })
})

async function play(game, board, boardElement) {
  while (!board.getWinningCells() && !board.isFull()) {
    const player = game.nextPlayer()

    // close the game loop if the game has ended
    const { cell, comment } = await player.getMoveCell(boardElement)

    board.markCell(cell, player.symbol)

    if (comment) game.setPlayerComment(comment)
  }

  const winningCells = board.getWinningCells()

  if (winningCells) {
    game.declareWinner()
    board.markCellsWon(winningCells)
  } else if (board.isFull()) {
    game.declareDraw()
  }
}

function displayError(errorContainer, error) {
  console.error(error)
  errorContainer.innerText = error.message
}
