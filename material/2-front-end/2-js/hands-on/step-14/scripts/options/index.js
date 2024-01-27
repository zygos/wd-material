import formPlayerOptionsHtml from './formPlayerOptionsHtml.js'
import getSelectedPlayers from './getSelectedPlayers.js'

const HIDDEN = 'hidden'

export default (optionsElement, playersOptions) => {
  const playerOptions = optionsElement.querySelector('.player-options')

  playerOptions.innerHTML = formPlayerOptionsHtml(playersOptions)

  return {
    getSelectedPlayers: () => getSelectedPlayers(playerOptions, playersOptions),
    hideOptions: () => optionsElement.classList.add(HIDDEN),
    showOptions: () => optionsElement.classList.remove(HIDDEN),
  }
}
