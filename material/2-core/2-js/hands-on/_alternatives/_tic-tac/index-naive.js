document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#board').addEventListener('click', handleBoardClick)
})

function handleBoardClick(event) {
  const cell = event.target

  if (cell.classList.contains('cell')) {
    cell.innerText = 'X'

    // has X won
    const winner = getWinner()

    if (winner) {
      alert(`${winner} won!`)
    } else {
      const emptyCells = document.querySelectorAll('.cell:empty')

      if (emptyCells.length === 0) {
        alert('Draw!')
      } else {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        randomCell.innerText = 'O'

        // has O won
        const winner = getWinner()

        if (winner) {
          alert(`${winner} won!`)
        }
      }
    }
  }
}

function getWinner() {
  const cells = document.querySelectorAll('.cell')

  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ]

  for (const line of lines) {
    const [a, b, c] = line

    if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
      return cells[a].innerText
    }
  }

  return null
}
