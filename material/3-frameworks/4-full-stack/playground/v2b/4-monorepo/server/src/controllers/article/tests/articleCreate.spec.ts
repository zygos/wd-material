import { authContext, requestContext } from '@tests/utils/context'
import { fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll, selectAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)
const db = await wrapInRollbacks(createTestDatabase())

it('should throw an error if user is not authenticated', async () => {
  // ARRANGE
  const { create } = createCaller(requestContext({ db }))

  // ACT & ASSERT
  await expect(
    create({
      title: 'My Special Article',
      content: 'This is the content of my special article.',
    })
  ).rejects.toThrow(/unauthenticated/i)
})

it('should create a persisted article', async () => {
  // ARRANGE
  const [user] = await insertAll(db, 'user', fakeUser())
  const { create } = createCaller(authContext({ db }, user))

  // ACT
  const articleReturned = await create({
    title: 'My Article',
    content: 'This is the content.',
  })

  // ASSERT
  expect(articleReturned).toMatchObject({
    id: expect.any(Number),
    title: 'My Article',
    content: 'This is the content.',
    userId: user.id,
  })

  const [articleCreated] = await selectAll(db, 'article', (eb) =>
    eb('id', '=', articleReturned.id)
  )

  expect(articleCreated).toMatchObject(articleReturned)
})
