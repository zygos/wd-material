import express from 'express'
import {
  createExpressMiddleware,
  CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
// import { createOpenApiExpressMiddleware, generateOpenApiDocument } from 'trpc-openapi'
import cors from 'cors'
import jsonErrorHandler from './middleware/jsonErrors'
import { type Database } from './database'
import { appRouter } from './trpc/routes'
import type { Context } from './trpc'

export default function createApp(db: Database) {
  const app = express()

  app.use(cors())
  app.use(express.json())

  // created for each request
  const createContext = ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res,
  }: CreateExpressContextOptions): Context => ({
    db, // provide database
  })

  // using TRPC router
  app.use(
    '/api/trpc',
    createExpressMiddleware({
      createContext,
      router: appRouter,
    })
  )

  // app.use('/api', createOpenApiExpressMiddleware<typeof appRouter>({
  //   createContext,
  //   router: appRouter,
  //   responseMeta: null,
  //   onError: null,
  //   maxBodySize: null,
  // }))

  // const openApiDocument = generateOpenApiDocument(appRouter, {
  //   title: 'tRPC OpenAPI',
  //   version: '1.0.0',
  //   baseUrl: 'http://localhost:3000',
  // })

  app.use(jsonErrorHandler)

  return app
}
