import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  // req.params.id // /articles/:id
  // req.query // /articles?limit=10&offset=20
  // req.body // { title: '...', content: '...' } for POST, PATCH, PUT

  res.send('Hello world!')
})

export default app
