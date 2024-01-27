import createTestDatabase from '@tests/utils/createTestDatabase'
import { createFor } from '@tests/utils/records'
import buildRepository from '../repository'

const db = await createTestDatabase()
const repository = buildRepository(db)
const createMovies = createFor(db, 'movies')

describe('findAll', () => {
  it('should return existing movies', async () => {
    // directly create movies in the database
    await createMovies([
      {
        id: 1,
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])

    const movies = await repository.findAll()

    expect(movies).toEqual([
      {
        id: expect.any(Number),
        title: 'Sherlock Holmes',
        year: 2009,
      },
    ])
  })

  it('should return a list of movies by their ID', async () => {
    // directly create movies in the database
    await createMovies([
      {
        id: 22,
        title: 'The Dark Knight',
        year: 2008,
      },
      {
        id: 234,
        title: 'Sherlock Holmes',
        year: 2009,
      },
      {
        id: 4153,
        title: 'Inception',
        year: 2010,
      },
    ])

    // select a few of them
    const movies = await repository.findByIds([234, 4153])

    // expect to have only the selected movies
    expect(movies).toHaveLength(2)
    expect(movies).toEqual([
      {
        id: 234,
        title: 'Sherlock Holmes',
        year: 2009,
      },
      {
        id: 4153,
        title: 'Inception',
        year: 2010,
      },
    ])
  })
})
