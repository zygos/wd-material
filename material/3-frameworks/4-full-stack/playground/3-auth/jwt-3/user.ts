import { TRPCError, initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import z from 'zod'

const { procedure, router } = initTRPC.context<{
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
}>().create()

const TOKEN_KEY = 'abc123'
const PASSWORD_PEPPER = '3#rqqZQvTPscm&gW'
const addPepper = (password: string) => `${password}${PASSWORD_PEPPER}`

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8),
})

export const userRouter = router({
  login: procedure
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

  signup: procedure
    .input(loginSchema)
    .mutation(async ({ input: user }) => {
      user.password = await bcrypt.hash(addPepper(user.password), 10)

      userRepository.create(user)
    }),

  changePassword: procedure
    .input(loginSchema)
    .mutation(async ({ input: { email, password }, ctx: { req } }) => {
      if (!req) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'This endpoint should be in Express.',
        })
      }

      const token = req.header('Authorization')?.replace('Bearer ', '')

      if (!token) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Missing token.',
        })
      }

      const user = getUserFromToken(token)

      if (user.email !== email) {
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

      // In any real application, we would also want to check that the user has
      // provided the correct current password. We will skip this for simplicity.

      // Since we are working with in-memory objects, we can mutate the user
      // in place. If we were working with a database, we would need to
      // update the user through a repository.
      userInDatabase.password = await bcrypt.hash(addPepper(password), 10)

      return {
        // We reflect back the provided email, alternatively we could provide
        // some other information, such as a success message.
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
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Invalid token.',
    })
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
