import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Movie, Rating } = entities

const db = await createInMemoryDatabase({ entities })
const movieRepository = db.getRepository(Movie)
const ratingRepository = db.getRepository(Rating)

it('should allow seeing a rating inside of a movie', async () => {
  await movieRepository.save({
    id: 124,
    title: 'The Shawshank Redemption',
    year: 1994,
  })

  await ratingRepository.save({
    movieId: 124,
    votes: 125053,
    rating: 9.8,
  })

  const movieWithRating = await movieRepository.findOne({
    where: {
      title: 'The Shawshank Redemption',
    },
    relations: {
      rating: true,
    },
  })

  expect(movieWithRating).toMatchObject({
    id: 124,
    title: 'The Shawshank Redemption',
    year: 1994,
    rating: {
      movieId: 124,
      votes: 125053,
      rating: 9.8,
    },
  })
})
