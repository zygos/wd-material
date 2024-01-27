import createApp from '@server/app'
import { Person } from '@server/database'
import { createInMemoryDatabase } from '@tests/utils/database'
import supertest from 'supertest'

const db = await createInMemoryDatabase()
const app = createApp(db)

describe('/GET', () => {
  it('should return a list of people', async () => {
    await db.getRepository(Person).save([
      {
        id: 2,
        name: 'Clint Eastwood',
        birth: 1930,
        directed: [],
        starred: [],
      },
    ])

    const { body } = await supertest(app).get('/people').expect(200)

    expect(body).toEqual([
      {
        id: 2,
        name: 'Clint Eastwood',
        birth: 1930,
        directed: [],
        starred: [],
      },
    ])
  })
})
