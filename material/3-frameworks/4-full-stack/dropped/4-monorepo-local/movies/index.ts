import { Database, Movie } from '@server/database'
import { Router } from 'express'
import { jsonRoute } from '@server/utils/middleware'
import { StatusCodes } from 'http-status-codes'
import getMovies from './getMovies'
import getMovieFull from './getMovieFull'
import createMovie from './createMovie'

export default (db: Database) => {
  const router = Router()
  const moviesRepository = db.getRepository(Movie)

  // get a list of movies by ids
  router.get('/', jsonRoute(getMovies(moviesRepository)))

  // get a single movie by id with all its relations
  router.get('/:id(\\d+)', jsonRoute(getMovieFull(moviesRepository)))

  // create new movies
  router.post(
    '/',
    jsonRoute(createMovie(moviesRepository), StatusCodes.CREATED)
  )

  return router
}
