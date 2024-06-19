import { authContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)
const db = await wrapInRollbacks(createTestDatabase())

it('should create a persisted article', async () => {
  // ARRANGE
  const [user] = await insertAll(db, 'user', fakeUser())
  const { create } = createCaller(authContext({ db }, user))

  // ACT
  const articleCreated = await create({
    title: 'My Special Article',
    content: 'This is the content of my special article.',
  })

  // ASSERT
  expect(articleCreated).toMatchObject({
    id: expect.any(Number),
    title: 'My Special Article',
    content: 'This is the content of my special article.',
    userId: user.id,
  })
})
