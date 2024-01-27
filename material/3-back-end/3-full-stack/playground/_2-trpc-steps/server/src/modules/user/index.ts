import { userInsertSchema } from '@server/entities/user'
import { publicProcedure, router } from '@server/trpc'
import { z } from 'zod'

export default router({
  greet: publicProcedure
    .input(z.string())
    .query(({ input }) => `Hello, ${input}`),

  signup: publicProcedure
    // defining our schema inline
    // .input(z.object({
    //   email: z.string().email().trim().toLowerCase(),
    //   password: z.string(),
    // }))

    // deriving it from our shared entity schema
    .input(
      // only email and password from the user schema
      userInsertSchema.pick({
        email: true,
        password: true,
      })
    )
    .mutation(({ input, ctx: { db } }) => {
      // ...
    }),
})
