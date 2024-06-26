import { fakeArticle, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { clearTables, insertAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)
const db = await wrapInRollbacks(createTestDatabase())

// a general setup for the tests
await clearTables(db, ['article'])
const [user] = await insertAll(db, 'user', fakeUser())

// as a non-logged in user
const { findAll } = createCaller({ db })

it('should return an empty list, if there are no articles', async () => {
  // Given (ARRANGE)
  expect(await findAll()).toHaveLength(0)
})

it('should return a list of articles', async () => {
  // Given (ARRANGE)
  await insertAll(db, 'article', [fakeArticle({ userId: user.id })])

  // When (ACT)
  const articles = await findAll()

  // Then (ASSERT)
  expect(articles).toHaveLength(1)
})

it('should return a list of articles', async () => {
  // Given (ARRANGE)
  await insertAll(db, 'article', [fakeArticle({ userId: user.id })])

  // When (ACT)
  const articles = await findAll()

  // Then (ASSERT)
  expect(articles).toHaveLength(1)
})

it('should return the latest article first', async () => {
  // Given (ARRANGE)
  const [articleOld] = await insertAll(db, 'article', [
    fakeArticle({ userId: user.id }),
  ])
  const [articleNew] = await insertAll(db, 'article', [
    fakeArticle({ userId: user.id }),
  ])

  // When (ACT)
  const articles = await findAll()

  // Then (ASSERT)
  expect(articles[0]).toMatchObject(articleNew)
  expect(articles[1]).toMatchObject(articleOld)
})
