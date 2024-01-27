export default {
  label: 'Random',
  getMove: (board, gameElement) => {
    const emptyCells = board
      .flatMap((row, rowIndex) => row
        .map((value, columnIndex) => ({
          row: rowIndex,
          column: columnIndex,
          value,
        })))
      .filter(({ value }) => value === null)

    return getRandomItem(emptyCells)
  },
}

const getRandomItem = array => array[Math.floor(Math.random() * array.length)]
