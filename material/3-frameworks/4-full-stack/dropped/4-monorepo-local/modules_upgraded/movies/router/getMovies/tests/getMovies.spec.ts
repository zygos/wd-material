import { createInMemoryDatabase } from '@tests/utils/createTestDatabase'
import { Movie } from '@server/database'
import moviesRouter from '../..'

const db = await createInMemoryDatabase()
const moviesRepository = db.getRepository(Movie)

const caller = moviesRouter.createCaller({ db })

it('should return movies by a list of query params', async () => {
  // we could use save() here as well, but insert() performs
  // better for bulk inserts.
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

  const movies = await caller.getMovies({
    ids: [88763, 816692],
  })

  // We could call the getMovies function directly. This would
  // allow us to isolate our procedure from the router, which is
  // preferrable. We would like to import as few modules around
  // our tested module as possible. Ideally, nothing at all.
  // However, in this case the benefit would be marginal at best,
  // as our router already does not do much.

  // Here's how we can call getMovies directly (if imported):
  // const movies = await getMovies({
  //   ctx: { db },
  //   rawInput: { ids: [88763, 816692] },
  //   input: { ids: [88763, 816692] },
  //   path: 'movies',
  //   type: 'query',
  // })
  // To make our tests easier to write and read, we would need to
  // add a helper function that would format the input for us:
  // const movies = await getMovies(procedureCall({ db }, { ids: [88763, 816692] })))
  // However, now we need to introduce a helper function. For a
  // larger codebase, that might make sense, but for a small app
  // like this, it's not worth it.

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
