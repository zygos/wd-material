import * as express from 'express'
import * as cors from 'cors'
import type { Database } from './database'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())

  app.use(express.json())

  app.use('/api/health', (_, res) => {
    res.status(200).send('OK')
  })

  // MUST: continue
  app.use('')

  return app
}
