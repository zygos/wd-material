import { type Movie } from '@server/database'
import { type Request } from 'express'
import { In, type Repository } from 'typeorm'
import { z } from 'zod'
import { idSchema } from '../schema'

const LIMIT_DEFAULT = 20
const LIMIT_MAX = 100

export default (movieRepository: Repository<Movie>) => async (req: Request) => {
  const options = getFindOptions(req.query)
  const movies = await movieRepository.find(options)

  return movies
}

function getFindOptions(query: Request['query']) {
  // if no ids are specified, return some first movies
  if (query.ids === undefined) {
    return {
      limit: LIMIT_DEFAULT,
    }
  }

  const ids = parseIds(query.ids)

  // if ids are specified, return only those movies
  return {
    where: {
      id: In(ids),
    },
  }
}

const idsSchema = z.array(idSchema).max(LIMIT_MAX, 'Too many ids')

function parseIds(idsJoined: unknown) {
  if (typeof idsJoined !== 'string') {
    return []
  }

  const idsSplit = idsJoined.split(',')

  return idsSchema.parse(idsSplit)
}
