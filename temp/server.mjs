import http from 'node:http'

http
  .createServer((req, res) => {
    res.end('Hello World')
  })
  .listen(3000, () => console.log('Listening...'))