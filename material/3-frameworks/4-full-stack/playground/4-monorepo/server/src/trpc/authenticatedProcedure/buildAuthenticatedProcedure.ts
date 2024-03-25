import type { Jwt, JwtPayload } from 'jsonwebtoken'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { authUserSchema } from '@server/entities/user'
import { publicProcedure } from '..'

type VerifyToken = (token: string) => Jwt | JwtPayload | string

// MUST: use parseTokenPayload instead
const tokenSchema = z.object({
  user: authUserSchema,
})

// An example with dependency injection.
export function buildAuthenticatedProcedure(verify: VerifyToken) {
  function getUserFromToken(token: string) {
    try {
      const tokenVerified = verify(token)
      const tokenParsed = tokenSchema.parse(tokenVerified)

      return tokenParsed.user
    } catch (error) {
      return null
    }
  }

  return publicProcedure.use(({ ctx, next }) => {
    if (ctx.authUser) {
      // If we have an authenticated user, we can proceed.
      return next({
        ctx: {
          // This is a bit of a type hack.
          // At this point ctx.authUser is AuthUser (no longer undefined).
          // If we make sure that this middleware always returns
          // ctx with authUser not undefined, then all routes using this
          // middleware will also know that authUser is defined.
          authUser: ctx.authUser,
        },
      })
    }

    // we depend on having an Express request object
    if (!ctx.req) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Missing Express request object',
      })
    }

    // if we do not have an authenticated user, we will try to authenticate
    const token = ctx.req.header('Authorization')?.replace('Bearer ', '')

    // if there is no token, we will throw an error
    if (!token) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthenticated. Please log in.',
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
        authUser,
      },
    })
  })
}
