import express from 'express'
import {
  createExpressMiddleware,
  CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import cors from 'cors'
import { type Database } from './database'
import { appRouter } from './modules'
import type { Context } from './trpc'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  // Endpoint for health checks - pinging the server to see if it's alive.
  // This can be used by tests, load balancers, monitoring tools, etc.
  app.use('/health', (_, res) => {
    res.status(200).send('OK')
  })

  // created context for each request, which we will be able to
  // access in our procedures
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const createContext = ({
    req,
    res,
  }: CreateExpressContextOptions): Context => ({
    // what we provide to our procedures
    db,
    req,
    res,
  })
  /* eslint-enable @typescript-eslint/no-unused-vars */

  // using TRPC router
  app.use(
    '/v1/trpc',
    createExpressMiddleware({
      createContext,
      router: appRouter,
    })
  )

  return app
}
