import type { Context } from '@server/trpc'

type ContextMinimal = Pick<Context, 'db'>

export const authUserId = 2

export const createContext = (
  context: Partial<Context> & ContextMinimal
): Context => ({
  req: {
    header: () => undefined,
    get: () => undefined,
  } as any,
  res: {
    cookie: () => undefined,
  } as any,
  ...context,
})
