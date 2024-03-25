export default (boardElement, columnCount) => [...boardElement
  .querySelectorAll('.cell')]
  .map(cell => cell.innerText || '-')
  .map(text => ` ${text}`) // single space prefix for consistent GPT token encoding
  .reduce((rows, cell, index) => {
    const rowIndex = Math.floor(index / columnCount)

    if (index % columnCount === 0) {
      rows.push([])
    }

    rows[rowIndex].push(cell)

    return rows
  }, [])
  .map(row => row.join(''))
  .join('\n')
