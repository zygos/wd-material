import type { Movie } from '@server/database'
import type { Request } from 'express'
import type { Repository } from 'typeorm'
import { insertable as personSchema } from '@server/modules/people/schema'
import { z } from 'zod'
import { insertable as movieSchema } from '../schema'

const input = z.object({
  ...movieSchema.shape,
  rating: z
    .object({
      votes: z.number().int().positive(),
      rating: z.number().min(0).max(10),
    })
    .optional(),
  directors: z.array(personSchema).optional(),
  stars: z.array(personSchema).optional(),
})

// Ideally, our createMovie module should not be aware about repositories.
// It should demand only for the necessary interface to create a movie, but
// we are using a repository here to simplify the example.
export default (repository: Repository<Movie>) => async (req: Request) => {
  const body = input.parse(req.body)
  const movie = await repository.save(body)

  return movie
}
