import { authContext } from '@tests/utils/context'
import { fakeArticle, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { clearTables, insertAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)
const db = await wrapInRollbacks(createTestDatabase())

const [user] = await insertAll(db, 'user', fakeUser())
const { findAll } = createCaller(authContext({ db }, user))

it('should return a list of articles', async () => {
  // Given (ARRANGE)
  await clearTables(db, ['article'])
  expect(await findAll()).toHaveLength(0)

  // When (ACT)
  await insertAll(db, 'article', [fakeArticle({ userId: user.id })])

  // Then (ASSERT)
  expect(await findAll()).toHaveLength(1)
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
