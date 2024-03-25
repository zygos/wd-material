import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log('received: %s', data)

    // Send it back to the client. This works as a confirmation that the
    // message was received.
    ws.send(data.toString())
  })
})
