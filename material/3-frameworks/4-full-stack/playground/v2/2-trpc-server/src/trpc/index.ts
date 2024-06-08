import { initTRPC } from '@trpc/server'
import type { Request, Response } from 'express'
import type { Database } from '../database'

export type Context = {
  db: Database

  // Express types. These are optional as
  // vast majority of requests do not need them.
  req?: Request
  res?: Response
}

const t = initTRPC.context<Context>().create()

export const {
  middleware,
  router,
  procedure: publicProcedure,
  mergeRouters,
  createCallerFactory,
} = t
