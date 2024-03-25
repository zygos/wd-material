import { publicProcedure } from '@server/trpc'
import { z } from 'zod'

export default publicProcedure
  .input(z.string().trim().max(100))
  .query(({ input }) => `Hello, ${input}`)
