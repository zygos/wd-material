export default function render(board, winner, isDraw, gameElement) {
  const boardElement = gameElement.querySelector('[data-board]')
  const messageElement = gameElement.querySelector('[data-message]')
  boardElement.innerHTML = formBoardHtml(board)
  boardElement.style = formBoardStyle(board)
  messageElement.textContent = formMessage(winner, isDraw)
}

function formBoardHtml(board) {
  return board
    .flatMap((row, rowIndex) => row
      .map((cell, columnIndex) => {
        const attributesString = stringifyAttributes({
          'data-row': rowIndex,
          'data-column': columnIndex,
          class: [
            'cell',
            ...!!cell ? 'disabled': '',
          ].join(' '),
        })

        return `<div ${attributesString}>${cell ?? ''}</div>`
      }))
      .join('\n')
}

function stringifyAttributes(attributes) {
  return Object
    .entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
}

function formBoardStyle(board) {
  const rows = board.length
  const columns = board[0].length

  return [
    `grid-template-rows: repeat(${rows}, 1fr);`,
    `grid-template-columns: repeat(${columns}, 1fr);`,
  ].join(' ')
}

function formMessage(winner, isDraw) {
  if (winner) return `Winner is ${winner}`
  if (isDraw) return 'Draw'

  return ''
}
