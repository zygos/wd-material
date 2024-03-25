import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection(ws) {
  // set up a few callbacks:
  // first - on error, log it to the console
  ws.on('error', console.error)

  // do the same for the any received messages
  ws.on('message', function message(data) {
    // data is a Buffer!
    // console can cast Buffer to a string
    console.log('received: %s', data)

    // but if we want to interact it as with a string, we need to call
    // Buffer .toString() method
    // console.log(buffer.toString())
  })

  // send a message immediately once the connection is established
  ws.send('Oh, hi, client!')
})
