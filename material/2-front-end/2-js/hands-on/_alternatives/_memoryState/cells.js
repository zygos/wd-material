const DISABLED = 'disabled'

export function getCells() {
  return document.querySelectorAll(`.cell[data-row][data-column]`)
}

export function setCellSign(sign, row, column) {
  const cell = document.querySelector(`.cell[data-row="${row}"][data-column="${column}"]`)
  cell.innerText = sign
  cell.classList.add(DISABLED)
}

export function isDisabled(cell) {
  return cell.classList.contains(DISABLED)
}
