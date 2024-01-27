import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Movie, Rating } = entities

const shawshank = Object.freeze({
  title: 'The Shawshank Redemption',
  year: 1994,
})

it('should allow creating a movie without a rating', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  await movieRepository.save({
    ...shawshank,
  })

  const movieSaved = await movieRepository.findOneByOrFail({
    title: shawshank.title,
  })

  expect(movieSaved).toMatchObject({
    id: expect.any(Number),
    ...shawshank,
  })
})

it('should allow creating a movie together with a rating', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)
  const ratingRepository = db.getRepository(Rating)

  await movieRepository.save({
    ...shawshank,
    rating: {
      votes: 125053,
      rating: 9.8,
    },
  })

  const movieWithRating = await movieRepository.findOneOrFail({
    where: {
      title: shawshank.title,
    },
    relations: {
      rating: true,
    },
  })

  expect(movieWithRating).toMatchObject({
    id: expect.any(Number),
    ...shawshank,
    rating: {
      movieId: expect.any(Number),
      votes: 125053,
      rating: 9.8,
    },
  })

  const movieId = movieWithRating.id
  expect(movieWithRating.rating.movieId).toBe(movieId)

  const rating = await ratingRepository.findOneBy({
    movieId,
  })

  expect(rating).toMatchObject({
    movieId,
    votes: 125053,
    rating: 9.8,
  })
})

it('should delete the rating when deleting the movie', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)
  const ratingRepository = db.getRepository(Rating)

  const movieCreated = await movieRepository.save({
    ...shawshank,
    rating: {
      votes: 125053,
      rating: 9.8,
    },
  })

  await movieRepository.remove(movieCreated)

  const [movie, rating] = await Promise.all([
    movieRepository.findOneBy({
      id: movieCreated.id,
    }),
    ratingRepository.findOneBy({
      movieId: movieCreated.id,
    }),
  ])

  expect(movie).toBeNull()
  expect(rating).toBeNull()
})

it('should update the rating when updating the movie', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  const movieCreated = await movieRepository.save({
    ...shawshank,
    rating: {
      votes: 125053,
      rating: 9.8,
    },
  })

  await movieRepository.save({
    ...movieCreated,
    rating: {
      votes: 125054,
      rating: 9.9,
    },
  })

  const movieWithRating = await movieRepository.findOneOrFail({
    where: {
      title: shawshank.title,
    },
    relations: {
      rating: true,
    },
  })

  expect(movieWithRating).toMatchObject({
    id: expect.any(Number),
    ...shawshank,
    rating: {
      movieId: expect.any(Number),
      votes: 125054,
      rating: 9.9,
    },
  })
})
