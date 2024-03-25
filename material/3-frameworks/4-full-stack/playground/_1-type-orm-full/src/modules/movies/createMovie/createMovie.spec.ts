import { createInMemoryDatabase } from '@tests/utils/database'
import { Movie } from '@server/database'
import createMovieFactory from '.'

const db = await createInMemoryDatabase()
const moviesRepository = db.getRepository(Movie)

const createMovie = createMovieFactory(moviesRepository)

const movie = Object.freeze({
  title: 'Back to the Future',
  year: 1985,
})

// Here we are technically performing 2 assertions, but given that
// there's 1:1 match between what's created and what's persisted,
// we can consider treat this as a single assertion.
it('should return a created movie', async () => {
  // ACT
  const movieCreated = await createMovie({
    body: movie,
  } as any)

  // ASSERT
  const [movieInDatabase] = await moviesRepository.find({})

  expect(movieCreated).toEqual({
    id: expect.any(Number),
    ...movie,
  })
  expect(movieCreated).toEqual(movieInDatabase)
})
