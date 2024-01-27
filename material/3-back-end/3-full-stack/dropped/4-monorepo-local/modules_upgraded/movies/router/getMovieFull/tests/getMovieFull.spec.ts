import { createInMemoryDatabase } from '@tests/utils/createTestDatabase'
import { Movie } from '@server/database'
import moviesRouter from '../..'

// Testing with a in-memory database is faster and easier to maintain.
// However, we have to specify everything we want to test inside of the test
// (or create a helper function to do it for us).
// Here we are using the repository directly. This somewhat exposes us
// to implementation details, but it's not too bad if we are not considering
// to change our ORM. Otherwise we could mock out ORM interactions or to directly
// interact with a fake database (in-memory SQLite).
// In some regards, this is also not a unit test, as we are testing the repository
// and the router together. However, we are not dealing Express-level routing
// and we are not dealing with service-level modules.
const db = await createInMemoryDatabase()
const moviesRepository = db.getRepository(Movie)

const caller = moviesRouter.createCaller({ db })

it('should return full movies', async () => {
  // save() allows us to save relationships as well.
  await moviesRepository.save([
    {
      id: 133093,
      title: 'The Matrix',
      year: 1999,
      rating: {
        movieId: 133093,
        rating: 8.7,
        votes: 1895415,
      },
      directors: [
        {
          birth: 1965,
          id: 905154,
          name: 'Lana Wachowski',
        },
        {
          birth: 1967,
          id: 905152,
          name: 'Lilly Wachowski',
        },
      ],
      stars: [
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
      ],
    },
  ])

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
