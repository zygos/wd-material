export const BOT_NAME = 'Alan'

// Allows using "Alan", "Alan, ", "alan", "..., Alan?"
const botNameTriggers = [
  // start of the message
  new RegExp(`^${BOT_NAME}\\b`, 'i'),

  // end of the message
  new RegExp(`\\b${BOT_NAME}[?!.]+$`, 'i'),
]

export function shouldBotRespond(message) {
  return botNameTriggers.some((trigger) => trigger.test(message))
}

export const MESSAGE_ROLES = {
  BOT: 'bot',
  USER: 'user',
}
