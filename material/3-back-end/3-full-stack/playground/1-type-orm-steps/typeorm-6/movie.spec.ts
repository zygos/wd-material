import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Movie } = entities

const twelveAngryMen = Object.freeze({
  id: 12313,
  title: '12 Angry Men',
  year: 1957,
})

const henry = Object.freeze({
  id: 92921,
  name: 'Henry Fonda',
  birth: 1905,
})

it('should allow creating a movie', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  const { id } = await movieRepository.save({
    ...twelveAngryMen,
  })

  const movieSaved = await movieRepository.findOneByOrFail({
    id,
  })

  expect(movieSaved).toMatchObject({
    ...twelveAngryMen,
  })
})

it('should allow inserting a list of people that starred in a movie', async () => {
  const db = await createInMemoryDatabase({ entities })
  const movieRepository = db.getRepository(Movie)

  const { id: movieId } = await movieRepository.save({
    ...twelveAngryMen,
    stars: [
      {
        ...henry,
      },
    ],
  })

  const movieWithStars = await movieRepository.findOneOrFail({
    where: { id: movieId },
    relations: {
      stars: true,
    },
  })

  expect(movieWithStars).toMatchObject({
    ...twelveAngryMen,
    stars: [
      {
        ...henry,
      },
    ],
  })

  const stars = await db.query('SELECT * FROM stars')

  expect(stars).toHaveLength(1)
  expect(stars[0]).toMatchObject({
    person_id: movieWithStars.stars[0].id,
    movie_id: movieId,
  })
})
