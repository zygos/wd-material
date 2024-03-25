export default function getWinningLine(boardElement, winLength) {
  const cells = [...boardElement.querySelectorAll('.cell')]
  const size = Math.sqrt(cells.length)

  const toCell = index => cells[index]
  const checkLine = (indices, symbol) => indices.every(index => cells[index].innerText === symbol)

  // Check rows
  for (let row = 0; row < size; row++) {
    for (let i = 0; i <= size - winLength; i++) {
      const rowIndices = Array.from({ length: winLength }, (_, j) => row * size + i + j)
      const symbol = cells[rowIndices[0]].innerText
      if (symbol !== '' && checkLine(rowIndices, symbol)) return rowIndices.map(toCell)
    }
  }

  // Check columns
  for (let col = 0; col < size; col++) {
    for (let i = 0; i <= size - winLength; i++) {
      const colIndices = Array.from({ length: winLength }, (_, j) => col + (i + j) * size)
      const symbol = cells[colIndices[0]].innerText
      if (symbol !== '' && checkLine(colIndices, symbol)) return colIndices.map(toCell)
    }
  }

  // Check diagonals
  for (let i = 0; i <= size - winLength; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const diagonal1 = Array.from({ length: winLength }, (_, k) => (i + k) * size + j + k)
      const diagonal2 = Array.from({ length: winLength }, (_, k) => (i + k) * size + (size - 1 - (j + k)))

      const symbol1 = cells[diagonal1[0]].innerText
      const symbol2 = cells[diagonal2[0]].innerText

      if (symbol1 !== '' && checkLine(diagonal1, symbol1)) return diagonal1.map(toCell)
      if (symbol2 !== '' && checkLine(diagonal2, symbol2)) return diagonal2.map(toCell)
    }
  }

  return null
}
