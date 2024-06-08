import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import projectRouter from '..'

const createCaller = createCallerFactory(projectRouter)
const db = await wrapInRollbacks(createTestDatabase())

it('should create a persisted project', async () => {
  // ARRANGE
  const [user] = await insertAll(db, 'user', fakeUser())
  const { create } = createCaller(authContext({ db }, user))

  // ACT
  const projectCreated = await create({
    name: 'My Special Project',
  })

  // ASSERT
  expect(projectCreated).toMatchObject({
    id: expect.any(Number),
    name: 'My Special Project',
    userId: user.id,
  })
})
