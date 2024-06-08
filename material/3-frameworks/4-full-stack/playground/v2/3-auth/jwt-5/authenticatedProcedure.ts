import jsonwebtoken from 'jsonwebtoken'
import { publicProcedure } from './trpc'
import { TOKEN_KEY } from './config'
import { parseTokenPayload } from './tokenPayload'
import { TRPCError } from '@trpc/server'

/**
 * This procedure will throw an error if the user is not authenticated.
 * If the user is authenticated, it will pass the authenticated user to
 * the next procedure in the chain.
 */
export const authenticatedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (ctx.authUser) {
    // If we have an authenticated user, we can proceed. Since authUser can
    // only be set internally, we are sure that it was set by us, not by
    // the user of our API.

    // Calling next() here would work.
    // If we would call next(), other procedures would rely on the ctx type
    // that we had at the beginning of this procedure. You can hover on it
    // to see that it contains authUser: AuthUser | undefined.

    // Since we ensure that all follow-up procedures that will use authenticatedProcedure
    // will have the authUser set, how can we make sure that the ctx type
    // is updated to not reflect the no longer possible undefined value?

    // In this `if` branch, we know that the authUser is set. TypeScript
    // can infer that too. We can use this fact to update the ctx type by passing
    // the authUser to the next procedure. Then we are telling TypeScript that
    // the ctx coming out of this procedure will have the authUser set to what is
    // its current type in this `if` branch, which is AuthUser.
    return next({
      ctx: {
        authUser: ctx.authUser,
      },
    })
  }

  // We depend on having an Express request object. This would not be a problem
  // in a real app, since we would have the Express request object. However,
  // this might save us some time in tests if we do not provide the req object.
  if (!ctx.req || typeof ctx.req.header !== 'function') {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'This endpoint should be in Express.',
    })
  }

  // If we do not have an authenticated user, we will try to authenticate.
  const token = ctx.req.header('Authorization')?.replace('Bearer ', '')

  // If there is no (valid) token, we will throw an error.
  if (!token) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Please login.',
    })
  }

  const authUser = getUserFromToken(token)

  if (!authUser) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token.',
    })
  }

  return next({
    ctx: {
      // set authUser for the next procedure using this middleware
      authUser,
    },
  })
})

function getUserFromToken(token: string) {
  try {
    const tokenDecoded = jsonwebtoken.verify(token, TOKEN_KEY)

    return parseTokenPayload(tokenDecoded)
  } catch (error) {
    // In practice, we would like to distinguish between different errors,
    // as we might have different courses of action for different errors.
    // For example, if we would use a multi-token approach, we might want
    // to distinguish between a token that is expired and a token that is
    // invalid. For simplicity, we will not do that here.
    // Also, we would generally parse the token to make sure that it is
    // of our expected shape.
    return null
  }
}
