import { initTRPC } from '@trpc/server'
import type { Request, Response } from 'express'
import type { Database } from '@server/database'
import SuperJSON from 'superjson'

export type Context = {
  db: Database

  // Express types. These are optional as
  // vast majority of requests do not need them.
  // Then it is a bit easier to test procedures.
  req?: Request
  res?: Response
}

export type ContextMinimal = Pick<Context, 'db'>

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

export const {
  middleware,
  router,
  procedure: publicProcedure,
  mergeRouters,
} = t
