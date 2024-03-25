import { columns, gptTheme, rows, winLength } from '../../config.js'
import getAiResponse from './getAiResponse.js'
import stringifyBoard from './stringifyBoard.js'
import toCellCoordinates from './toCellCoordinates.js'

export default class GptPlayer {
  static label = 'GPT AI'

  isExternal = true
  symbol

  constructor(symbol) {
    this.symbol = symbol
  }

  async getMove(boardElement) {
    const boardState = stringifyBoard(boardElement, columns)

    const prompt = `You are an expert in a game of tic-tac-toe. You are playing a ${columns}x${rows} tic-tac-toe game where you need to get ${winLength} in a continuous line. You are "${this.symbol}". Try not to lose! Talk in a style of a ${gptTheme}.`
    const response = await getAiResponse(prompt, boardState)

    const move = toCellCoordinates(boardState, response)
    const comment = getComment(response)

    return {
      cell: getCell(boardElement, move),
      comment,
    }
  }
}

const getComment = response => response
  .split('\n')[0]

const getCell = (boardElement, { row, column }) => {
  const index = row * columns + column

  return boardElement
    .querySelectorAll('.cell')
    .item(index)
}
