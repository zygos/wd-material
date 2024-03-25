import 'dotenv/config'
import { WebSocketServer } from 'ws'
import { getRandomColor } from './colors.js'
import { AnthropicChatBot } from './anthropic.js'
import { BOT_NAME, MESSAGE_ROLES, shouldBotRespond } from './chatbot.js'
import { getRandomUsername } from './username.js'

const wss = new WebSocketServer({ port: 8080 })
const chatbot = new AnthropicChatBot({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const clients = []
const messageHistory = []

wss.on('connection', function connection(ws) {
  const color = getRandomColor()
  const username = getRandomUsername(6)

  clients.push({ color, username, ws })

  ws.on('error', console.error)

  ws.on('message', async function message(dataRaw) {
    const data = JSON.parse(dataRaw.toString())

    sendMessage({
      color,
      message: data.message,
      role: MESSAGE_ROLES.USER,
      username,
    })

    if (!shouldBotRespond(data.message)) return

    const botStream = await chatbot.chat(messageHistory)

    let messageJoined = ''
    let messageId

    // Alternatively, we could use botStream.on, create a stream
    // pipeline, etc. Here we will use another property of streams -
    // the fact that they are async iterables and can be used in
    // for-await-of loops.
    for await (const chunk of botStream) {
      // a better approach would be to have an internal Stream
      // format which is independent of the API provided Stream
      // format, but for the sake of simplicity, we'll just
      // rely on the API-provided Stream events.
      switch (chunk.type) {
        // We can use API documentation, chunk TypeScript types
        // or just console.log to figure out what the chunk
        // contains and how to we could use it.
        case 'message_start':
          messageId = chunk.message.id
          break

        case 'content_block_delta':
          messageJoined += chunk.delta.text

          sendToAll({
            color: null, // bot has no color
            message: chunk.delta.text,
            messageId,
            role: MESSAGE_ROLES.BOT,
            username: BOT_NAME,
          })
          break

        case 'message_stop':
          // Technically, the message should be pushed to history
          // earlier and then updated on each content_block_delta.
          // Now, if a user sends another message before
          // the bot finishes, the messages will be out of
          // order, but that's a limitation we'll accept
          // for the sake of simplicity.
          addToHistory({
            color: null, // bot has no color
            message: messageJoined,
            role: MESSAGE_ROLES.BOT,
            username: BOT_NAME,
          })
          break
      }
    }
  })

  ws.on('close', function close() {
    const clientIndex = clients.findIndex((client) => client.ws === ws)

    clients.splice(clientIndex, 1)
  })
})

function sendMessage(message) {
  addToHistory(message)
  sendToAll(message)
}

function addToHistory(message) {
  messageHistory.push(message)
}

function sendToAll(message) {
  const messageJson = JSON.stringify(message)

  clients.forEach((client) => {
    client.ws.send(messageJson)
  })
}
