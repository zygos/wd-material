import config from '@server/config'
import createApp from '@server/app'
import supertest from 'supertest'
import { createTestDatabase } from './utils/database'

// starts with the real database configuration
const database = await createTestDatabase(config.database)
const app = createApp(database)

afterAll(() => {
  database.destroy()
})

it('can launch the app', async () => {
  await supertest(app).get('/health').expect(200, 'OK')
})
