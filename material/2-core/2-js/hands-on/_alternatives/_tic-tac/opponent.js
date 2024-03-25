export function getAutoMove(boardState) {
  const emptyCells = boardState
    .flatMap((row, rowIndex) => row
      .map((value, columnIndex) => ({
        row: rowIndex,
        column: columnIndex,
        value,
      })))
    .filter(({ value }) => value === null)

  const randomIndex = Math.floor(Math.random() * emptyCells.length)

  return emptyCells[randomIndex]
}
