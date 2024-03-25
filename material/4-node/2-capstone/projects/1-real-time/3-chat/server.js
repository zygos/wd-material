import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

const clients = []

wss.on('connection', function connection(ws) {
  // Add the new client to the list of connected clients
  clients.push(ws)

  ws.on('error', console.error)

  ws.on('message', function message(data) {
    console.log('received: %s', data)

    // Send it to all connected clients.
    // Alternatively, we could use:
    // - wss.send to send a message to all connected clients
    // - iterate through the built-in `wss.clients` variable
    // These approaches are fine and do the same thing. However, we will
    // do this manually as:
    // - it makes it abundantly clear how the client list is managed
    // - it allows us to store more information about clients, not just the
    //   WebSocket object
    clients.forEach((client) => {
      client.send(data.toString())
    })
  })

  ws.on('close', function close() {
    // Remove the client from the list of connected clients
    const clientIndex = clients.indexOf(ws)
    clients.splice(clientIndex, 1)
  })
})
