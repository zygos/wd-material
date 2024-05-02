import { z } from 'zod'
import { procedure } from '@server/trpc'
import { Movie } from '@server/database'
import { schema } from '../../schema'

export default procedure
  .input(
    z.object({
      id: schema.shape.id,
    })
  )
  .query(async ({ input: { id }, ctx: { db } }) =>
    db.getRepository(Movie).findOneOrFail({
      where: { id },
      relations: {
        directors: true,
        rating: true,
        stars: true,
      },
    })
  )
