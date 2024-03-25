import { symbols } from './config.js'

export function formPlayerSelects(playerOptions, playerCount) {
  return new Array(playerCount)
    .fill()
    .map((_, selectIndex) => {
      const playerOptionsHtml = playerOptions
        .map((playerOption, index) => option(index, playerOption.label, index === selectIndex))
        .join('\n')

      const playerSelectHtml = select('player', playerOptionsHtml)

      const symbolOptionsHtml = symbols
        .map((symbol, index) => option(symbol, symbol, index === selectIndex))
        .join('\n')

      const symbolSelectHtml = select('symbol', symbolOptionsHtml)

      return `<div class="player" data-player-select>${symbolSelectHtml} ${playerSelectHtml}</div>`
    })
    .join('vs.')
}

const select = (name, options) =>
  `<select class="form-select" name="${name}">${options}</select>`

const option = (value, label, isSelected = false) =>
  `<option value="${value}" ${isSelected ? 'selected' : ''}>${label}</option>`

export function getPlayers(playerSelects, playersOptions) {
  const players = [...playerSelects.querySelectorAll('[data-player-select]')]
    .map(playerElement => {
      const playerIndex = playerElement.querySelector('[name="player"]').value
      const symbol = playerElement.querySelector('[name="symbol"]').value

      return {
        Player: playersOptions[Number(playerIndex)],
        symbol,
      }
    })

  const hasDuplicateSymbols = players
    .map(({ symbol }) => symbol)
    .some((symbol, index, symbols) => symbols.indexOf(symbol) !== index)

  if (hasDuplicateSymbols) {
    throw new Error('Please select distinct symbols')
  }

  return players
    .map(({ Player, symbol }) => new Player(symbol))
}
