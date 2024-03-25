import { fakeUser } from '@server/entities/tests/fakes'
import { authUserSchema, type AuthUser } from '@server/entities/user'
import type { Context, ContextMinimal } from '@server/trpc'

/**
 * Creates a mock Express context object for testing purposes.
 * @param context - The context object to be partially overridden.
 * @returns A new context object with the provided properties and default mock values.
 */
export const requestContext = (
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

/**
 * Creates a new context object with an authenticated user.
 * @param context - The context object to extend.
 * @param user - The authenticated user to add to the context.
 * @returns A new context object with the authenticated user added.
 */
export const authContext = (
  context: Partial<Context> & ContextMinimal,
  user: AuthUser = fakeUser()
): Context => ({
  authUser: authUserSchema.parse(user),
  ...context,
})
