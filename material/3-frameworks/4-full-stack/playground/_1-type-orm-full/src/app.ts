import express from 'express'
import cors from 'cors'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'
import moviesRouter from './modules/movies'
import peopleRouter from './modules/people'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  // Endpoint for health checks - pinging the server to see if it's alive.
  // This can be used by tests, load balancers, monitoring tools, etc.
  app.use('/health', (_, res) => {
    res.status(200).send('OK')
  })

  app.use('/movies', moviesRouter(db))
  app.use('/people', peopleRouter(db))

  app.use(jsonErrorHandler)

  return app
}
