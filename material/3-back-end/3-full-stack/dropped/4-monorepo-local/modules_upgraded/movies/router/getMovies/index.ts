import z from 'zod'
import { Movie } from '@server/database'
import { procedure } from '@server/trpc'
import { In } from 'typeorm'
import { schema } from '../../schema'

export default procedure
  .input(
    z.object({
      ids: z.array(schema.shape.id),
    })
  )
  .query(async ({ input: { ids }, ctx: { db } }) =>
    db.getRepository(Movie).find({
      where: {
        id: In(ids),
      },
    })
  )
