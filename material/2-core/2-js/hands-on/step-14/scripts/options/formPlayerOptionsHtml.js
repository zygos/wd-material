import { playerCount, symbols } from '../config.js'

export default playerOptions => Array(playerCount)
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

    return `<div class="player">${symbolSelectHtml} ${playerSelectHtml}</div>`
  })
  .join('vs.')

const select = (name, options) =>
  `<select class="form-select" name="${name}">${options}</select>`

const option = (value, label, isSelected = false) =>
  `<option value="${value}" ${isSelected ? 'selected' : ''}>${label}</option>`
