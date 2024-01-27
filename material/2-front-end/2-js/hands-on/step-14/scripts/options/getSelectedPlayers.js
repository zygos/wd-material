export default (playerSelects, playersOptions) => {
  const players = [...playerSelects.querySelectorAll('.player')]
    .map(playerElement => {
      const playerIndex = playerElement.querySelector('[name="player"]').value
      const symbol = playerElement.querySelector('[name="symbol"]').value

      return {
        Player: playersOptions[Number(playerIndex)],
        symbol,
      }
    })

  const hasDuplicateSymbols = players
    .map(player => player.symbol)
    .some((symbol, index, symbols) => symbols.indexOf(symbol) !== index)

  if (hasDuplicateSymbols) {
    throw new Error('Please select distinct symbols')
  }

  return players
    .map(({ Player, symbol }) => new Player(symbol))
}
