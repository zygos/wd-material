import { authContext } from '@tests/utils/context'
import { createTestDatabase } from '@tests/utils/database'
import { fakeArticle, fakeUser } from '@server/entities/tests/fakes'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import { createCallerFactory, router } from '..'
import { articleAuthorProcedure } from '.'

const routes = router({
  testCall: articleAuthorProcedure.query(() => 'passed'),
})

const db = await wrapInRollbacks(createTestDatabase())
const [userOne, userTwo] = await insertAll(db, 'user', [fakeUser(), fakeUser()])

const [articleOne, articleTwo] = await insertAll(db, 'article', [
  fakeArticle({ userId: userOne.id }),
  fakeArticle({ userId: userTwo.id }),
])

const createCaller = createCallerFactory(routes)
const authenticated = createCaller(authContext({ db }, userOne))

it('should pass if article belongs to the user', async () => {
  const response = await authenticated.testCall({ articleId: articleOne.id })

  expect(response).toEqual('passed')
})

it('should throw an error if articleId is not provided', async () => {
  // casting to any to allow calling without type safe input
  await expect((authenticated.testCall as any)({})).rejects.toThrow(/article/i)
})

it('should throw an error if user provides a non-existing articleId', async () => {
  // casting to any to allow calling without type safe input
  await expect(
    (authenticated.testCall as any)({ articleId: 999 })
  ).rejects.toThrow(/article/i)
})

it('should throw an error if user provides null articleId', async () => {
  await expect(
    authenticated.testCall({ articleId: null as any })
  ).rejects.toThrow(/article/i)
})

it('should throw an error if article does not belong to the user', async () => {
  await expect(
    authenticated.testCall({ articleId: articleTwo.id })
  ).rejects.toThrow(/article/i)
})
