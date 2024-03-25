import { createInMemoryDatabase } from '@tests/utils/database'
import * as entities from '.'

const { Person } = entities

const movies = Object.freeze([
  {
    id: 549,
    title: 'Back to the Future',
    year: 1985,
  },
  {
    id: 12312,
    title: 'Forrest Gump',
    year: 1994,
  },
])

const zemeckis = Object.freeze({
  id: 92920,
  name: 'Robert Zemeckis',
  birth: 1952,
})

it('should allow inserting a list of people that directed a person', async () => {
  const db = await createInMemoryDatabase({ entities })
  const personRepository = db.getRepository(Person)

  const { id: personId } = await personRepository.save({
    ...zemeckis,
    directed: [...movies],
  })

  const personWithDirected = await personRepository.findOneOrFail({
    where: { id: personId },
    relations: {
      directed: true,
    },
  })

  expect(personWithDirected).toMatchObject({
    ...zemeckis,
    directed: [...movies],
  })

  const directors = await db.query('SELECT * FROM directors')

  expect(directors).toHaveLength(2)
  const moviesIds = movies.map(({ id }) => id)
  const moviesIdsInDirectors = directors.map(({ movie_id }: any) => movie_id)
  expect(moviesIdsInDirectors).toEqual(expect.arrayContaining(moviesIds))

  expect(directors[0].person_id).toBe(personId)
  expect(directors[1].person_id).toBe(personId)
})
