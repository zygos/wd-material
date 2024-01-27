import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Movie, Person } = entities

const twelveAngryMen = Object.freeze({
  id: 123512,
  title: '12 Angry Men',
  year: 1957,
  rating: {
    votes: 839000,
    rating: 9.0,
  },
})

const henry = Object.freeze({
  id: 18905,
  name: 'Henry Fonda',
  birth: 1905,
})

it('should allow creating a person', async () => {
  const db = await createInMemoryDatabase({ entities })
  const personRepository = db.getRepository(Person)

  await personRepository.save({
    ...henry,
  })

  const personSaved = await personRepository.findOneByOrFail({
    name: henry.name,
  })

  expect(personSaved).toMatchObject({
    ...henry,
  })
})

it('should allow creating a person without date of birth', async () => {
  const db = await createInMemoryDatabase({ entities })
  const personRepository = db.getRepository(Person)

  await personRepository.save({
    ...henry,
    birth: null,
  })

  const personSaved = await personRepository.findOneByOrFail({
    name: henry.name,
  })

  expect(personSaved.birth).toBeNull()
})

it('should allow inserting a list of movies a person stared in', async () => {
  const db = await createInMemoryDatabase({ entities })
  const personRepository = db.getRepository(Person)

  const { id } = await personRepository.save({
    ...henry,
    starred: [
      {
        ...twelveAngryMen,
      },
    ],
  })

  const personWithMovies = await personRepository.findOneOrFail({
    where: { id },
    relations: {
      starred: {
        // starred and then rating for each movie
        rating: true,
      },
    },
  })

  expect(personWithMovies).toMatchObject({
    ...henry,
    starred: [
      {
        ...twelveAngryMen,
      },
    ],
  })

  const stars = await db.query('SELECT * FROM stars')

  expect(stars).toHaveLength(1)
  expect(stars[0]).toMatchObject({
    person_id: henry.id,
    movie_id: twelveAngryMen.id,
  })
})

it('should allow attaching a person to an existing movie by providing its id', async () => {
  const db = await createInMemoryDatabase({ entities })
  const personRepository = db.getRepository(Person)
  const movieRepository = db.getRepository(Movie)

  // create a movie
  const { id: movieId } = await movieRepository.save({
    ...twelveAngryMen,
  })

  // then create a person and attach the movie to it by providing its id
  const { id: personId } = await personRepository.save({
    ...henry,
    starred: [
      {
        id: movieId,
      },
    ],
  })

  const personWithMovies = await personRepository.findOneOrFail({
    where: { id: personId },
    relations: {
      starred: {
        rating: true,
      },
    },
  })

  expect(personWithMovies).toMatchObject({
    ...henry,
    starred: [
      {
        ...twelveAngryMen,
      },
    ],
  })
})
