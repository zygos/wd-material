import { createCallerFactory } from '@server/trpc'
import { authContext } from '@tests/utils/context'
import {
  fakeArticle,
  fakeComment,
  fakeUser,
} from '@server/entities/tests/fakes'
import { insertAll, selectAll } from '@tests/utils/records'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import commentRouter from '..'

// Example of testing with a database. This can deliver more
// confidence that our project works as expected, but it's also
// trickier to set up and maintain if we have relationships and
// constraints in the database.
// For example, now we have to create a user and an article in the
// database just to be able to create a comment.
const createCaller = createCallerFactory(commentRouter)
const db = await wrapInRollbacks(createTestDatabase())

const [userArticleAuthor, userOther] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])
const [article] = await insertAll(
  db,
  'article',
  fakeArticle({
    userId: userArticleAuthor.id,
  })
)

it('allows creating a comment', async () => {
  // ARRANGE (Given)
  const comment = fakeComment({ articleId: article.id })

  // ACT (When)
  const { post } = createCaller(authContext({ db }, userOther))
  const commentReturned = await post(comment)

  // ASSERT (Then)
  const [commentSaved] = await selectAll(db, 'comment', (cb) =>
    cb('id', '=', commentReturned.id)
  )
  expect(commentReturned).toMatchObject(commentSaved)
  expect(commentSaved).toHaveProperty('userId', userOther.id)
  expect(commentReturned.author).toMatchObject({
    id: userOther.id,
    firstName: userOther.firstName,
    lastName: userOther.lastName,
  })

  // an extra check that the password is not returned
  expect((commentReturned.author as any).password).toBeUndefined()
})

it('throws an error if the article does not exist', async () => {
  // ARRANGE (Given)
  const comment = fakeComment({ articleId: article.id + 999999 })

  // ACT (When) & ASSERT (Then)
  const { post } = createCaller(authContext({ db }))
  await expect(post(comment)).rejects.toThrow(/not found/i)
})

describe('permissions', () => {
  // shared scenario setup
  const comment = fakeComment({ articleId: article.id })

  it('allows article author to post a comment', async () => {
    // ARRANGE (Given)
    const { post } = createCaller(authContext({ db }, userArticleAuthor))

    // ACT (When)
    await expect(post(comment)).resolves.toMatchObject({
      ...comment,
      userId: userArticleAuthor.id,
      createdAt: expect.any(Date),
    })
  })

  it('allows other users to post a comment', async () => {
    // ARRANGE (Given)
    const { post } = createCaller(authContext({ db }, userOther))

    // ACT (When)
    await expect(post(comment)).resolves.toMatchObject({
      ...comment,
      userId: userOther.id,
      createdAt: expect.any(Date),
    })
  })

  it('disallows non-logged in visitors to post a comment', async () => {
    // ARRANGE (Given)
    const { post } = createCaller({
      db,
      req: {
        // no Auth header
        header: () => undefined,
      } as any,
    })

    // ACT (When)
    await expect(post(comment)).rejects.toThrow(/unauthenticated|unauthorized/i)
  })
})
