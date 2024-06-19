import { TRPCError, initTRPC } from '@trpc/server'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const { procedure, router, createCallerFactory } = initTRPC.create()

export { createCallerFactory }

// Optional pepper. This would be an environment variable.
// If we enforce strong passwords, this would not be needed.
const PASSWORD_PEPPER = '3#rqqZQvTPscm&gW'

// If we are using pepper, we want to add pepper in the same place every time.
const addPepper = (password: string) => `${password}${PASSWORD_PEPPER}`

const loginSchema = z.object({
  // We would also want to trim any whitespace and lowercase the email.
  // Some users would accidentally type in their email with a space at the end or
  // with a capital letter and then would be extremely frustrated that they can't log in.
  email: z.string().trim().toLowerCase().email(),

  password: z.string().min(8),
})

export const userRouter = router({
  login: procedure
    .input(loginSchema)
    .mutation(async ({ input: { email, password } }) => {
      const user = userRepository.find(email)

      if (!user) {
        // We could throw the same error for incorrect email and password to not give
        // away if a particular user has an account with us or not.
        // However, this would likely increase the number of support requests. Users having
        // issues with logging in is one of the most common issues that support teams deal with.
        // Also, some users forget which email they used to sign up with and they might not figure
        // out that they could check their email account. They might then try to reset their
        // password in a password reset page, but then, we would not be able to tell them
        // that they have an account with us. We would need to tell them that we sent them
        // if they have an account with us. They might then wait for the email to arrive
        // for an account that does not exist, so then they would write to support team, etc.
        // Hiding information through obscurity is not necessarily worth it in non security-critical
        // applications.
        // Here, we will be user-friendly and tell the user that we could not find their account.
        // Also, we are throwing TRPCError instead of Error as it handles an error message and
        // error code which will be used to send a proper HTTP status code to the client.
        // With TypeScript, TRPCError does not allow us to throw an error with an invalid code,
        // so we can use strings, which allows us to forget about additional constant definitions.
        // Try changing the code to "NOT_FOUNDS" and you will see that TypeScript will complain.
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

      return {
        // Let the front-end know what they are logged in as.
        user: { email },

        // This would be some kind of a token, we will cover them
        // later on.
        token: 'login-token',
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
