import { initTRPC } from '@trpc/server'
import type { Request, Response } from 'express'
import type { Database } from '../database'

export type Context = {
  // Dependency injection with a database through context,
  // which is a function argument for our procedures.
  db: Database

  // Express types. These are optional as
  // vast majority of requests do not need them.
  // Then it is a bit easier to test procedures.
  req?: Request
  res?: Response
}

const t = initTRPC.context<Context>().create()

export const {
  middleware,
  router,
  procedure: publicProcedure,
  mergeRouters,
} = t
