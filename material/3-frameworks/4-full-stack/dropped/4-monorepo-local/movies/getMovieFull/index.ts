import type { Repository } from 'typeorm'
import type { Movie } from '@server/database'
import type { Request } from 'express'
import { idSchema } from '../schema'

export default (movieRepository: Repository<Movie>) => async (req: Request) => {
  const id = idSchema.parse(req.params.id)
  const movie = await movieRepository.findOneOrFail({
    where: { id },
    relations: {
      directors: true,
      rating: true,
      stars: true,
    },
  })

  return movie
}
