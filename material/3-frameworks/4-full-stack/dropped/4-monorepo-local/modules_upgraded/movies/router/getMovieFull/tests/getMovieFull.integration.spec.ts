import { createTestDatabase } from '@tests/utils/createTestDatabase'
import moviesRouter from '../..'

// Test example with a real database.
// You do not need to have to perform unit and integration tests for every
// endpoints. In fact, in most places, you would be fine with a unit test.

// This test is quite slow as it needs to query lots of rows and it is
// harder to maintain as we need to make sure the database is in a good
// state. Some of our expectations are baked-in to the database, so these
// tests would break if referenced rows are deleted or modified.
const db = await createTestDatabase(process.env.DATABASE_URL!)
const caller = moviesRouter.createCaller({ db })

it('should return full movies', async () => {
  const movie = await caller.getMovieFull({
    id: 133093,
  })

  expect(movie).toEqual({
    id: 133093,
    title: 'The Matrix',
    year: 1999,
    rating: {
      movieId: 133093,
      rating: 8.7,
      votes: 1895415,
    },
    directors: expect.arrayContaining([
      {
        birth: 1967,
        id: 905152,
        name: 'Lilly Wachowski',
      },
      {
        birth: 1965,
        id: 905154,
        name: 'Lana Wachowski',
      },
    ]),
    stars: expect.arrayContaining([
      {
        birth: 1964,
        id: 206,
        name: 'Keanu Reeves',
      },
      {
        birth: 1961,
        id: 401,
        name: 'Laurence Fishburne',
      },
      {
        birth: 1967,
        id: 5251,
        name: 'Carrie-Anne Moss',
      },
      {
        birth: 1960,
        id: 915989,
        name: 'Hugo Weaving',
      },
    ]),
  })
})
