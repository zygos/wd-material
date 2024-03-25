import { createInMemoryDatabase } from '@tests/utils/database'
import { In } from 'typeorm'
import * as entities from '.'

const { Movie } = entities

const matrix = Object.freeze({
  id: 151234,
  title: 'The Matrix',
  year: 1999,
})

const matrixReloaded = Object.freeze({
  id: 54123,
  title: 'The Matrix Reloaded',
  year: 2003,
})

const wachowskis = Object.freeze([
  {
    id: 123123,
    name: 'Lana Wachowski',
    birth: 1965,
  },
  {
    id: 123124,
    name: 'Lilly Wachowski',
    birth: 1967,
  },
])

it('allows inserting a list of people that directed a movie', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  await movieRepository.save({
    ...matrix,
    directors: [...wachowskis],
  })
  await movieRepository.save({
    ...matrixReloaded,
    directors: [...wachowskis],
  })

  const [matrxWithDirectors, matrixReloadedWithDirectors] =
    await movieRepository.find({
      where: { id: In([matrix.id, matrixReloaded.id]) },
      relations: {
        directors: true,
      },
      order: {
        id: 'DESC',
      },
    })

  expect(matrxWithDirectors).toMatchObject({
    ...matrix,
    directors: [...wachowskis],
  })

  expect(matrixReloadedWithDirectors).toMatchObject({
    ...matrixReloaded,
    directors: [...wachowskis],
  })

  const directors = await db.query('SELECT * FROM directors')

  expect(directors).toHaveLength(4)
  const wachowskisIds = wachowskis.map(({ id }) => id)
  const wachowskisIdsInDirectors = directors.map(
    ({ person_id }: any) => person_id
  )
  expect(wachowskisIdsInDirectors).toEqual(
    expect.arrayContaining(wachowskisIds)
  )
  const matrixDirectorsCount = directors.filter(
    ({ movie_id }: any) => movie_id === matrix.id
  ).length

  expect(matrixDirectorsCount).toBe(2)
})
