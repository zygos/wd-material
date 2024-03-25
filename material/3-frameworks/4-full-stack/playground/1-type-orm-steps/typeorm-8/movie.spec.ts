import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Movie } = entities

const movieIncorrectYear = Object.freeze({
  title: 'Invalid Movie',
  year: 1870,
})

// Might not be considered a movie by many, but
// it's impossible for something to be a movie before
// it.
const horseInMotion = Object.freeze({
  title: 'The Horse in Motion',
  year: 1878,
})

it('should not allow creating a movie with a year before 1878', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  await expect(
    movieRepository.save({
      ...movieIncorrectYear,
    })
  ).rejects.toThrowError()
})

it('should allow creating a movie with a year after 1878', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  await movieRepository.save({
    ...horseInMotion,
  })

  const movieSaved = await movieRepository.findOneByOrFail({
    title: horseInMotion.title,
  })

  expect(movieSaved.year).toBe(horseInMotion.year)
})
