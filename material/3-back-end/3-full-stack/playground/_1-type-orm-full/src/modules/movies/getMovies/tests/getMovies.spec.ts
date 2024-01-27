import { createInMemoryDatabase } from '@tests/utils/database'
import { Movie } from '@server/database'
import getMoviesFactory from '..'

const db = await createInMemoryDatabase()
const moviesRepository = db.getRepository(Movie)

const getMovies = getMoviesFactory(moviesRepository)

// In this test, we are providing a fake database and we are testing
// against a result and not mocked calls, which is often preferable.
it('should return movies by a list of query params', async () => {
  // ARRANGE
  // Our test needs to provide everything it needs in its setup.
  await moviesRepository.insert([
    {
      id: 88763,
      title: 'Back to the Future',
      year: 1985,
    },
    {
      id: 102926,
      title: 'The Silence of the Lambs',
      year: 1991,
    },
    {
      id: 816692,
      title: 'Interstellar',
      year: 2014,
    },
  ])

  // ACT
  const movies = await getMovies({
    query: {
      ids: '88763,816692',
    },
  } as any)

  // ASSERT
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
