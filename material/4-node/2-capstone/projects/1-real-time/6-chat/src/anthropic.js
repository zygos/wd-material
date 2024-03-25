import Anthropic from '@anthropic-ai/sdk'
import { BOT_NAME, MESSAGE_ROLES } from './chatbot.js'

export class AnthropicChatBot {
  static ROLES = {
    ASSISTANT: 'assistant',
    USER: 'user',
  }

  constructor({ apiKey }) {
    this.api = new Anthropic({ apiKey })
  }

  async chat(messageHistory) {
    const messagesChained = messageHistory
      .slice(-20)
      .reduce((messages, { color, message, role, username }) => {
        // chain multiple user messages into a single message
        if (role === MESSAGE_ROLES.USER) {
          const messagePrevious = messages[messages.length - 1]
          const isUserPrevious = messagePrevious?.role === AnthropicChatBot.ROLES.USER

          if (isUserPrevious) {
            messagePrevious.content += `\n${username}: ${message}`
            return messages
          }
        }

        const messageAnthropic = {
          // map to Anthropic roles
          role: role === MESSAGE_ROLES.BOT
            ? AnthropicChatBot.ROLES.ASSISTANT
            : AnthropicChatBot.ROLES.USER,
          content: `${color}: ${message}`,
        }

        messages.push(messageAnthropic)

        return messages
      }, [])

    return this.api.messages.stream({
      system: `You are an assistant named ${BOT_NAME} talking to multiple Turing College (TC) students. Each student has a 6 letter Turing College username, such as abcdef, johdoe etc. Due to system limitations, messages from different learners can be combined under a single user message text block. However, your messages are never combined with user messages. You should answer only to messages that invoke you by your name - ${BOT_NAME}. Try to provide brief responses. If you are not sure about the answer, you can say that you do not know the answer.`,
      messages: messagesChained,
      max_tokens: 480,
      // haiku model would be also good, but it is not released at this time
      model: 'claude-3-sonnet-20240229',
      temperature: 0.7,
    })
  }
}
