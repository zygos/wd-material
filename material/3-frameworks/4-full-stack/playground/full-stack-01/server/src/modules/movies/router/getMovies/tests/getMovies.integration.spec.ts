import { createTestDatabase } from '@tests/utils/createTestDatabase'
import moviesRouter from '../..'

// NOTE: you do not need to write an integration test AND a unit test for every
// endpoint. We generally recommend to write unit tests for most (if not all) endpoints.
const db = await createTestDatabase(process.env.DATABASE_URL!)
const caller = moviesRouter.createCaller({ db })

it('should return movies by a list of query params', async () => {
  const movies = await caller.getMovies({
    ids: [88763, 816692],
  })

  expect(movies).toHaveLength(2)
  expect(movies).toEqual([
    {
      id: 88763,
      title: 'Back to the Future',
      year: 1985,
    },
    {
      id: 816692,
      title: 'Interstellar',
      year: 2014,
    },
  ])
})
