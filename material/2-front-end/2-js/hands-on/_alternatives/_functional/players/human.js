export default {
  label: 'Human',
  getMove: async (board, gameElement) => {
    const abortController = new AbortController()

    return new Promise((resolve) => {
      gameElement.addEventListener('click', (event) => {
        const cell = event.target.closest('.cell')

        if (!cell || cell.innerText) return

        // remove listener
        abortController.abort()

        // return move
        resolve({
          row: Number(cell.dataset.row),
          column: Number(cell.dataset.column),
        })
      }, { signal: abortController.signal })
    })
  },
}
