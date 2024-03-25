import { initTRPC } from '@trpc/server'

export type Context = {
  // Express req and res objects that we
  // would have in an Express.js app a
  // tiny slice of the express request
  // object that is relevant for us
  req?: {
    header(name: string): string | undefined
  },

  // this is not used if we are not using cookies
  res?: {
    cookie: any,
  }

  // an additional property that we can
  // add for our convenience that will
  // store the authenticated user
  authUser?: AuthUser,
}

export type AuthUser = {
  id: number
  email: string
}

const trpcInstance = initTRPC.context<Context>().create()

export const {
  procedure: publicProcedure,
  router,
} = trpcInstance
