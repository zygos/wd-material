// Built-in Node.js module for handling HTTP requests
import http from 'node:http'

// We create a server and tell it what it should do for each request.
const server = http.createServer((request, response) => {
  // we print out the request URL to the Node console
  console.log('Request:', request.url)

  // setting to HTTP status code 200, which means "OK"
  response.statusCode = 200

  // Indicating the type of content we're sending back.
  // We could indicate other types, such as JSON or HTML.
  response.setHeader('Content-Type', 'text/plain')

  // We are ending our response with a message.
  response.end('Hello, world!')
})

// Just some port number for development purposes. Ports
// under 1024 are privileged and reserved for certain applications,
// so we pick some port number above 1023.
const PORT = 3000

server.listen(PORT, 'localhost', () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
