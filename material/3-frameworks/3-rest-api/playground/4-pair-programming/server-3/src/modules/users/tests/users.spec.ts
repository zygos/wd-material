import supertest from 'supertest'
import createTestDatabase from '@tests/utils/createTestDatabase'
import { selectAllFor } from '@tests/utils/records'
import { Insertable } from 'kysely'
import createApp from '@/app'
import { User } from '@/database'

const db = await createTestDatabase()
const app = createApp(db)
const selectUsers = selectAllFor(db, 'user')

afterEach(async () => {
  await db.deleteFrom('user').execute()
})

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
    await supertest(app).post('/users').send(fakeUser()).expect(201)

    await expect(selectUsers()).resolves.toEqual([userMatcher()])
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
