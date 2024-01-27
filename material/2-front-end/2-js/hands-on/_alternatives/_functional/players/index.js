import humanPlayer from './human.js'
import randomPlayer from './random.js'

const playerSlots = [
  { sign: 'X' },
  { sign: 'O' },
]

export const playersOptions = [
  humanPlayer,
  randomPlayer,
]

export const formPlayers = players => players
  .map((player, index) => ({
    ...playerSlots[index],
    ...player,
  }))
