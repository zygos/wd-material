import { formPlayers, playersOptions } from './players/index.js'
import playGame from './game/index.js'

document.addEventListener('DOMContentLoaded', async () => {
  const rules = {
    rows: 4,
    columns: 4,
    win: 4,
  }

  const [humanPlayer, randomPlayer] = playersOptions

  const players = formPlayers([
    randomPlayer,
    humanPlayer,
  ])

  const gameElement = document.querySelector('#game')

  gameElement
    .querySelector('[data-restart]')
    .addEventListener('click', () => {
      playGame(rules, players, gameElement)
    })

  playGame(rules, players, gameElement)
})
