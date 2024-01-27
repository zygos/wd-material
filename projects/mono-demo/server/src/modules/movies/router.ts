import z from 'zod'
import { procedure, router } from '@server/trpc'

export default router({
  getMovies: procedure
    .input(
      z.object({
        ids: z.array(z.number()),
      })
    )
    // eslint-disable-next-line arrow-body-style
    .query(async ({ input: { ids }, ctx: { db } }) => {
      console.log('here')
      return []
    }),
})
