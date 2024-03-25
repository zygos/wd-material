import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import z from 'zod'
import { publicProcedure, router } from './trpc'
import { TOKEN_KEY, PASSWORD_PEPPER } from './config'
import { authenticatedProcedure } from './authenticatedProcedure'
import { prepareTokenPayload } from './tokenPayload'
import { TRPCError } from '@trpc/server'

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

      const payload = prepareTokenPayload({
        id: 1,
        email: user.email,
      })

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
          message: 'We could not find your account with this email address',
        })
      }

      userInDatabase.password = await bcrypt.hash(addPepper(password), 10)

      return {
        email,
      }
    })
})

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

type UserRepository = {
  list: User[]
  create(user: User): void
  find(email: string): User | undefined
}
