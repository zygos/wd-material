import { hash } from 'bcrypt'
import { publicProcedure } from '@server/trpc'
import config from '@server/config'
import { userInsert } from '@server/entities/user'
import { TRPCError } from '@trpc/server'
import provideRepos from '@server/trpc/provideRepos'
import { userRepository } from '@server/repositories/userRepository'
import { omit } from 'lodash-es'
import { assertError } from '@server/utils/errors'

export default publicProcedure
  .use(
    provideRepos({
      userRepository,
    })
  )
  .input(
    // no matter the additional fields, we will only ask
    // for email and password to log in
    userInsert.pick({
      email: true,
      password: true,
    })
  )
  .mutation(async ({ input: { email, password }, ctx: { repos } }) => {
    const passwordHash = await hash(password, config.auth.passwordCost)

    const user = await repos.userRepository
      .create({
        email,
        password: passwordHash,
      })
      // handling errors using the Promise.catch method
      .catch((error) => {
        assertError(error)

        // wrapping an ugly error into a user-friendly one
        if (error.message.includes('duplicate key')) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User with this email already exists',
            cause: error,
          })
        }

        throw error
      })

    return omit(user, 'password')
  })
