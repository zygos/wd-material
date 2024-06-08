import createApp from '@server/app'
import supertest from 'supertest'
import { createTestDatabase } from './utils/database'

const database = await createTestDatabase()
const app = createApp(database)

it('can launch the app', async () => {
  await supertest(app).get('/api/health').expect(200, 'OK')
})
