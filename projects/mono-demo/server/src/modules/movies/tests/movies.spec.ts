// import createTestDatabase from '@tests/utils/createTestDatabase'
import createDatabase from '@server/database'
import moviesRouter from '../router'
// import createDatabase from '../../../database'

// Testing with a real database, fine for read-only tests, as we would not
// want to pollute the database with test data, as then we need to clean it up.
// To make sure we are not modifying anything in a real database, we are using
// a read-only connection.
const db = createDatabase(process.env.DATABASE_URL as string)

// We could also easily use an in-memory database here, but then we would need
// to provide some test data
// const db = await createTestDatabase()

const caller = moviesRouter.createCaller({
  db,
})

describe('GET', () => {
  it('should return movies by a list of query params', async () => {
    const movies = await caller.getMovies({
      ids: [133093, 816692],
    })

    expect(movies).toHaveLength(2)
    expect(movies).toEqual([
      {
        id: 133093,
        title: 'The Matrix',
        year: 1999,
      },
      {
        id: 816692,
        title: 'Interstellar',
        year: 2014,
      },
    ])
  })
})
