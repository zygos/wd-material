import { initTRPC } from '@trpc/server'
import type { Request, Response } from 'express'
import type { AuthUser } from '@server/entities/user'
import type { Database } from '@server/database'
import type * as entities from '@server/entities'
import type { Repository } from 'typeorm'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'
import { fromZodError } from 'zod-validation-error'

type Entities = typeof entities

export type Context = {
  db: Database

  // Express types. These are optional as
  // vast majority of requests do not need them.
  // Then it is a bit easier to test procedures.
  req?: Request
  res?: Response

  // We can also add our own custom context properties.
  authUser?: AuthUser

  // This is used only in the project.create example.
  // It is a bit more advanced and not necessary unless you want
  // to apply dependency injection thoroughly.
  repos?: {
    [K in keyof Entities]?: Repository<InstanceType<Entities[K]>>
  }
}

export type ContextMinimal = Pick<Context, 'db'>

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
  errorFormatter(opts) {
    const { shape, error } = opts

    if (error.cause instanceof ZodError) {
      const validationError = fromZodError(error.cause)

      return {
        ...shape,
        data: {
          message: validationError.message,
        },
      }
    }

    return shape
  },
})

export const {
  middleware,
  router,
  procedure: publicProcedure,
  mergeRouters,
} = t
