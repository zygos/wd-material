import { publicProcedure } from '@server/trpc'
import { z } from 'zod'

export default publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )

  .mutation(async ({ input, ctx: { db } }) => {
    // ...
  })
