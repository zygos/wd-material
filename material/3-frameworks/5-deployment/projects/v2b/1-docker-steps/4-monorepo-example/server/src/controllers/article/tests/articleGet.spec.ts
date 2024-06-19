import { authContext } from '@tests/utils/context'
import { fakeArticle, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { insertAll } from '@tests/utils/records'
import articleRouter from '..'

const createCaller = createCallerFactory(articleRouter)
const db = await wrapInRollbacks(createTestDatabase())

// a pair of users and articles we will use in our test cases
const [user, userOther] = await insertAll(db, 'user', [fakeUser(), fakeUser()])

const [article, articleOther] = await insertAll(db, 'article', [
  fakeArticle({ userId: user.id }),
  fakeArticle({ userId: userOther.id }),
])

const { get } = createCaller(authContext({ db }, user))

it('should return an article', async () => {
  // When (ACT)
  const articleResponse = await get(article.id)

  // Then (ASSERT)
  expect(articleResponse).toMatchObject(article)
})

it('should throw an error if the article does not exist', async () => {
  const nonExistantId = article.id + articleOther.id

  // When (ACT)
  await expect(get(nonExistantId)).rejects.toThrowError(/not found/i)
})
