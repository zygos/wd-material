import { userRepository } from '@server/repositories/userRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { z } from 'zod'

export default publicProcedure
  .use(provideRepos({ userRepository }))

  // user input
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(8).max(32),
      firstName: z.string().min(1).max(100),
      lastName: z.string().min(1).max(100),
    })
  )

  // what we do and return to the client
  .mutation(async ({ input, ctx: { repos } }) => {
    // TODO: implement the signup procedure
    // ...
  })
