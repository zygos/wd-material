import supertest from 'supertest'
// import createTestDatabase from '@tests/utils/createTestDatabase'
import createDatabase from '@/database'
import createApp from '@/app'

// Testing with a real database, fine for read-only tests, as we would not
// want to pollute the database with test data, as then we need to clean it up.
// To make sure we are not modifying anything in a real database, we are using
// a read-only connection.
const db = createDatabase(process.env.DATABASE_URL as string, {
  readonly: true,
})

// We could also easily use an in-memory database here, but then we would need
// to provide some test data
// const db = await createTestDatabase()

const app = createApp(db)

describe('GET', () => {
  it('should return all movies if no ids are provided', async () => {
    const { body } = await supertest(app).get('/movies').expect(200)

    expect(body).toHaveLength(10)
  })

  it('should return movies by a list of query params', async () => {
    const { body } = await supertest(app)
      .get('/movies?id=133093,816692')
      .expect(200)

    expect(body).toHaveLength(2)

    expect(body).toEqual([
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

  // it('should return movies by a list of titles', async () => {
  //   const { body } = await supertest(app)
  //     .get('/movies?id=Interstellar')
  //     .expect(200)

  //   expect(body).toHaveLength(1)

  //   expect(body).toEqual([
  //     {
  //       id: 133093,
  //       title: 'The Matrix',
  //       year: 1999,
  //     },
  //     {
  //       id: 816692,
  //       title: 'Interstellar',
  //       year: 2014,
  //     },
  //   ])
  // })
})
