import supertest from 'supertest'
import { createTestDatabase } from '@tests/utils/database'
import { selectAll } from '@tests/utils/records'
import type { Insertable } from 'kysely'
import { wrapInRollbacks } from '@tests/utils/transactions'
import createApp from '@/app'
import type { User } from '@/database'

const db = await wrapInRollbacks(createTestDatabase())
const app = createApp(db)

const fakeUser = (
  overrides: Partial<Insertable<User>> = {}
): Insertable<User> => ({
  firstName: 'Mary',
  lastName: 'Shelley',
  ...overrides,
})

const userMatcher = (overrides: Partial<Insertable<User>> = {}) => ({
  id: expect.any(Number),
  ...overrides, // for id
  ...fakeUser(overrides),
})

describe('POST', () => {
  it('should allow creating a new user', async () => {
    const { body } = await supertest(app)
      .post('/users')
      .send(fakeUser())
      .expect(201)

    expect(body).toEqual(userMatcher())
  })

  it('persists the new user', async () => {
    const { body: userReturned } = await supertest(app)
      .post('/users')
      .send(fakeUser())
      .expect(201)

    // check that the user was persisted in the database correctly
    const [userInDatabase] = await selectAll(db, 'user', (eb) =>
      eb('id', '=', userReturned.id)
    )

    expect(userInDatabase).toEqual(userMatcher())
  })

  it('should ignore the provided id', async () => {
    const { body } = await supertest(app)
      .post('/users')
      .send({
        ...fakeUser(),
        id: 123456,
      })

    expect(body.id).not.toEqual(123456)
  })
})

describe('PATCH', () => {
  it('does not support patching', async () => {
    await supertest(app).patch('/users/123').expect(405)
  })
})

describe('DELETE', () => {
  it('does not support deleting', async () => {
    await supertest(app).delete('/users/123').expect(405)
  })
})

describe('GET', () => {
  it('does not support getting all users', async () => {
    await supertest(app).get('/users').expect(405)
  })

  it('does not support getting individual users', async () => {
    await supertest(app).get('/users/123').expect(405)
  })
})
