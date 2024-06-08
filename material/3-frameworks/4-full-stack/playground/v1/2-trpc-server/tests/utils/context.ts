import type { Context } from '@server/trpc'

type ContextMinimal = Pick<Context, 'db'>

export const createRequestContext = (
  context: Partial<Context> & ContextMinimal
): Context => ({
  // fake Express request and response objects
  req: {
    header: () => undefined,
    get: () => undefined,
  } as any,
  res: {
    cookie: () => undefined,
  } as any,

  // what we passed in
  ...context,
})
