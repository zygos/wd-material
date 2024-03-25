import 'dotenv/config'
import { WebSocketServer } from 'ws'
import { CohereClient } from 'cohere-ai'

const PORT = 8080

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
})

const wss = new WebSocketServer({ port: PORT })

const CHATBOT_COLOR = 'black'
const chatters = []
const colors = [
  'red',
  'blue',
  'green',
  'purple',
  'orange',
  'brown',
  'darkblue',
  'darkgreen',
  'darkred',
]
const messageHistory = []

wss.on('connection', (ws) => {
  console.log('new connection!')

  const color = colors[Math.floor(Math.random() * colors.length)]

  chatters.push({
    ws,
    color,
  })

  ws.on('error', console.error)

  ws.on('message', async (rawData) => {
    console.log('received', rawData.toString())
    const { type, ...data } = JSON.parse(rawData.toString())

    if (type === 'message') {
      const messageBody = {
        type: 'message',
        message: data.message,
        color,
        isBot: false,
      }

      messageHistory.push(messageBody)

      chatters.forEach((chatter) => {
        chatter.ws.send(JSON.stringify(messageBody))
      })

      chatters.forEach((chatter) => {
        if (chatter.ws !== ws) {
          chatter.ws.send(JSON.stringify({
            type: 'typing',
            color,
            isTyping: false,
          }))
        }
      })

      const chatHistory = messageHistory.slice(0, -1).map(message => ({
        role: message.color === CHATBOT_COLOR ? 'CHATBOT' : 'USER',
        userName: message.color === CHATBOT_COLOR ? 'Chatbot' : message.color,
        message: message.message,
      }))

      console.log('chatHistory', chatHistory)
      console.log(`${color} says: ${data.message}`)

      const stream = await cohere.chatStream({
        preamble: `You are a chat bot talking to various anonymous users. Each user has a randomly assigned color, such as red, blue, green, etc. Provide brief responses. Also, username is the same as user color. They always match. Sometimes you are referred to as Chatty.`,
        message: `${color} says: ${data.message}`,
        chatHistory,
      })

      let botMessageId
      for await (const chunk of stream) {
        console.log('chat', chunk)
        if (chunk.eventType === 'stream-start') {
          botMessageId = chunk.generationId
          chatters.forEach((chatter) => {
            chatter.ws.send(JSON.stringify({
              type: 'typing',
              color: CHATBOT_COLOR,
              isTyping: true,
              botMessageId,
            }))
          })
        }

        if (chunk.eventType === 'text-generation') {
          console.log(chunk.text);
          chatters.forEach((chatter) => {
            chatter.ws.send(JSON.stringify({
              type: 'messageChunk',
              message: chunk.text,
              color: CHATBOT_COLOR,
              botMessageId,
            }))
          })
        }

        if (chunk.eventType === 'stream-end') {
          messageHistory.push({
            type: 'message',
            message: chunk.response.text,
            color: CHATBOT_COLOR,
            botMessageId,
          })
          chatters.forEach((chatter) => {
            chatter.ws.send(JSON.stringify({
              type: 'typing',
              color: CHATBOT_COLOR,
              isTyping: false,
              botMessageId,
            }))
          })
        }
      }
    } else if (type === 'typing') {
      const typingBody = {
        type: 'typing',
        isTyping: data.isTyping,
        color,
      }

      chatters.forEach((chatter) => {
        if (chatter.ws !== ws) {
          chatter.ws.send(JSON.stringify(typingBody))
        }
      })
    }
  })

  messageHistory.forEach((message) => {
    ws.send(JSON.stringify(message))
  })

  ws.on('close', () => {
    console.log('connection closed')
    chatters.splice(chatters.indexOf(ws), 1)
  })

  ws.send(JSON.stringify({
    type: 'color',
    color,
  }))
})
