import { Person } from '@server/database'
import { createInMemoryDatabase } from '@tests/utils/database'
import findPeopleFactory from '.'

const db = await createInMemoryDatabase()
const personRepo = db.getRepository(Person)

const findPeople = findPeopleFactory(personRepo)

it('should return an empty list when there are no people', async () => {
  const people = await findPeople()

  expect(people).toEqual([])
})

it('should return saved people', async () => {
  await personRepo.save({
    id: 2,
    name: 'Robert Zemeckis',
    birth: 1952,
  })

  const people = await findPeople()

  expect(people).toEqual([
    {
      id: 2,
      name: 'Robert Zemeckis',
      birth: 1952,
      directed: [],
      starred: [],
    },
  ])
})

it('should return saved people with relationships', async () => {
  await personRepo.save({
    id: 2,
    name: 'Clint Eastwood',
    birth: 1930,
    directed: [
      {
        id: 1,
        title: 'Unforgiven',
        year: 1992,
      },
    ],
    starred: [
      {
        id: 7,
        title: 'Dirty Harry',
        year: 1971,
      },
    ],
  })

  const people = await findPeople()

  expect(people).toEqual([
    {
      id: 2,
      name: 'Clint Eastwood',
      birth: 1930,
      directed: [
        {
          id: 1,
          title: 'Unforgiven',
          year: 1992,
        },
      ],
      starred: [
        {
          id: 7,
          title: 'Dirty Harry',
          year: 1971,
        },
      ],
    },
  ])
})
