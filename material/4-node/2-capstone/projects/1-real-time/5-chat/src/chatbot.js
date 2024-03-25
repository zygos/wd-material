export const BOT_NAME = 'Alan'

// This makes our bot a bit easier to trigger in the chat,
// as it allows using "Alan", "Alan, ", "alan", "..., Alan?"
const botNameTriggers = [
  // start of the message
  new RegExp(`^${BOT_NAME}\\b`, 'i'),

  // end of the message
  new RegExp(`\\b${BOT_NAME}[?!.]+$`, 'i'),
]

export function shouldBotRespond(message) {
  return botNameTriggers.some((trigger) => trigger.test(message))
}

// Inside of our application we will always refer to these roles.
// Then, if we decide to swap out our chatbot API provider, we will
// not need to change the roles in our application.
export const MESSAGE_ROLES = {
  BOT: 'bot',
  USER: 'user',
}
