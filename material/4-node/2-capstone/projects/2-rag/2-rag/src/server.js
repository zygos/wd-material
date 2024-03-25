import 'dotenv/config'
import { WebSocketServer } from 'ws'
import { getRandomColor } from './colors.js'
import { AnthropicChatBot } from './anthropic.js'
import { BOT_NAME, MESSAGE_ROLES, shouldBotRespond } from './chatbot.js'
import { getRandomUsername } from './username.js'
import { getRelevantDocuments } from './documents.js'

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

    const documents = getRelevantDocuments(data.message)
    const botStream = await chatbot.chat(messageHistory, documents)

    let messageJoined = ''
    let messageId

    for await (const chunk of botStream) {
      switch (chunk.type) {
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
          addToHistory({
            color: null, // bot has no color
            message: messageJoined,
            messageId,
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
