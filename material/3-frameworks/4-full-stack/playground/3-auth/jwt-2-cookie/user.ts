import { TRPCError, initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { z } from 'zod'

const { procedure, router, createCallerFactory } = initTRPC.context<{ res: any }>().create()

export { createCallerFactory }

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
    .mutation(async ({ input: { email, password }, ctx: { res } }) => {
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
        // For an example, we will return a static user id.
        // Here we are also returing the email to clearly see that
        // we are getting the correct user.
        // In practice you would try not to return less sensitive information
        // if it is not needed.
        user: { id: 1, email },
      }

      const token = jsonwebtoken.sign(
        payload,
        TOKEN_KEY,
        {
          expiresIn: '1d',
        }
      )

      // if using cookies
      res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      })

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
