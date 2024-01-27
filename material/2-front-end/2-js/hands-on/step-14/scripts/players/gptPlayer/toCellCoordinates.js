import { BOARD_SEPARATOR } from './consts.js'

export default (boardState, responseText) => {
  const boardStateNew = getBoardState(responseText)
  const boardStateNewLines = toBoardLines(boardStateNew)
  const boardStateLines = toBoardLines(boardState)

  const row = boardStateNewLines
    .findIndex((line, index) => !equalsDeep(line, boardStateLines[index]))

  const column = boardStateNewLines[row]
    .findIndex((cell, index) => cell !== boardStateLines[row][index])

  return { row, column }
}

const toBoardLines = string => (string + ' ')
  .split('\n')
  .map(line => line
    .trim()
    .split(' '))

const equalsDeep = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((value, index) => equalsDeep(value, b[index]))
  }

  return a === b
}

const getBoardState = (responseText) => {
  const lines = responseText.split('\n')

  const lineStart = lines
    .findIndex(line => line.startsWith(BOARD_SEPARATOR))

  const lineEnd = lines
    .findIndex((line, index) => index > lineStart && line.startsWith(BOARD_SEPARATOR))

  return lines
    .slice(lineStart + 1, lineEnd)
    .join('\n')
}
