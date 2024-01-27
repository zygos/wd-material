const DISABLED = 'disabled'

export function getCells() {
  return [...document.querySelectorAll(`.cell[data-row][data-column]`)]
}

export function getBoard() {
  const cells = getCells()
    .map(cell => cell.innerText || null)

  return [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
  ]
}

export function setMove(sign, row, column) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-column="${column}"]`)
  cell.innerText = sign
  cell.classList.add(DISABLED)
}

export function isDisabled(cell) {
  return cell.classList.contains(DISABLED)
}

export function isGameOver() {
  return isDraw() || !!getWinner()
}

export function isDraw() {
  return getCells()
    .every(cell => cell.innerText !== '')
}

export function getWinner() {
  const rows = getBoard()

  const lines = [
    // rows
    ...rows,

    // columns
    ...rows.map((_, index) => rows.map(row => row[index])),

    // diagonals
    [rows[0][0], rows[1][1], rows[2][2]],
  ]

  const winner = lines
    .filter(line => line[0])
    .find(line => line.every(sign => sign === line[0]))

  return winner ?? null
}

export function resetBoard() {
  getCells().forEach((cell) => {
    cell.innerText = ''
    cell.classList.remove(DISABLED)
  })
}
