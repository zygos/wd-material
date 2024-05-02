import { TRPCError, initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { z } from 'zod'

const { procedure: publicProcedure, router, createCallerFactory } = initTRPC.context<{
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
}>().create()

export { createCallerFactory }

// Our authenticatedProcedure = publicProcedure + provided authentication function.
// We could chain these middlewares together and add even more middlewares.
// For example: adminProcedure = authenticatedProcedure + function checking
// that authUser.role === admin, or something similar.
const authenticatedProcedure = publicProcedure.use(({ ctx, next }) => {
  // we depend on having an Express request object
  if (!ctx.req) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'This endpoint should be in Express.',
    })
  }

  // if we do not have an authenticated user, we will try to authenticate
  const token = ctx.req.header('Authorization')?.replace('Bearer ', '')

  // if there is no token, we will throw an error
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
      message: 'Invalid token',
    })
  }

  return next({
    ctx: {
      // set authUser
      authUser,
    },
  })
})

const TOKEN_KEY = 'abc123'
const PASSWORD_PEPPER = '3#rqqZQvTPscm&gW'
const addPepper = (password: string) => `${password}${PASSWORD_PEPPER}`

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),

  password: z.string().min(8),
})

export const userRouter = router({
  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input: { email, password } }) => {
      const user = userRepository.find(email)

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'We could not find your account with this email address',
        })
      }

      const passwordMatch = await bcrypt.compare(
        addPepper(password),
        user.password
      )

      if (!passwordMatch) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Incorrect password',
        })
      }

      const payload = {
        // for an example, we will return a static user id
        user: { id: 1, email },
      }

      const token = jsonwebtoken.sign(
        payload,
        TOKEN_KEY,
        {
          expiresIn: '1d',
        }
      )

      return {
        user: { email },
        token, // if we are using cookies, we should not return the token
      }
    }),

  signup: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input: user }) => {
      user.password = await bcrypt.hash(addPepper(user.password), 10)

      userRepository.create(user)
    }),

  // We use the authenticatedProcedure instead of the publicProcedure.
  changePassword: authenticatedProcedure
    .input(loginSchema)
    .mutation(async ({ input: { email, password }, ctx: { authUser } }) => {
      if (authUser.email !== email) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to change this password.',
        })
      }

      const userInDatabase = userRepository.find(email)

      if (!userInDatabase) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found.',
        })
      }

      userInDatabase.password = await bcrypt.hash(addPepper(password), 10)

      return {
        email,
      }
    })
})

function getUserFromToken(token: string) {
  try {
    const { user } = jsonwebtoken.verify(token, TOKEN_KEY) as {
      user: AuthUser,
    }

    return user
  } catch (error) {
    return null
  }
}

export const userRepository: UserRepository = {
  list: [],
  create(user) {
    this.list.push(user)
  },
  find(email) {
    return this.list.find((user) => user.email === email)
  },
}

type User = {
  email: string
  password: string
}

type AuthUser = {
  id: number
  email: string
}

type UserRepository = {
  list: User[]
  create(user: User): void
  find(email: string): User | undefined
}
