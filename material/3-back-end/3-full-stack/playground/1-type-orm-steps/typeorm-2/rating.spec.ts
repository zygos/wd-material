import { createInMemoryDatabase } from '@tests/utils/database'
import { Rating } from './rating'
import * as entities from '.'

const db = await createInMemoryDatabase({ entities })
const ratingRepository = db.getRepository(Rating)

it('should create a rating', async () => {
  await ratingRepository.save({
    movieId: 124,
    votes: 125053,
    rating: 9.8,
  })

  const ratingSaved = await ratingRepository.findOneBy({
    movieId: 124,
  })

  expect(ratingSaved).toMatchObject({
    movieId: 124,
    votes: 125053,
    rating: 9.8,
  })
})
