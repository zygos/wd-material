import { WebSocketServer } from 'ws'
import { getRandomColor } from './colors.js'
import { getRandomUsername } from './username.js'

const wss = new WebSocketServer({ port: 8080 })

const clients = []

wss.on('connection', function connection(ws) {
  const color = getRandomColor()
  const username = getRandomUsername(6)

  clients.push({ color, username, ws })

  ws.on('error', console.error)

  ws.on('message', function message(rawData) {
    console.log('received: %s', rawData)

    const data = JSON.parse(rawData.toString())

    const messageJson = JSON.stringify({
      color,
      message: data.message,
      username,
    })

    clients.forEach((client) => {
      client.ws.send(messageJson)
    })
  })

  ws.on('close', function close() {
    // note the updated code here
    const clientIndex = clients.findIndex((client) => client.ws === ws)

    clients.splice(clientIndex, 1)
  })
})
