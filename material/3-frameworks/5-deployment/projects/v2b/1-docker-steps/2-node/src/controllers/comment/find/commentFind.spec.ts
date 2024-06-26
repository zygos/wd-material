import { authRepoContext } from '@tests/utils/context'
import { createCallerFactory } from '@server/trpc'
import commentRouter from '..'

const createCaller = createCallerFactory(commentRouter)

// Example of simple mocked repositories, which allows skipping the database
// setup altogether. This is an alternative to using a database in tests.
const repos = {
  commentRepository: {
    findPublicByArticleId: async (articleId: number) => [
      { id: 1, articleId, user: { id: 1 } },
      { id: 2, articleId, user: { id: 2 } },
    ],
  },
}

const { find } = createCaller(authRepoContext(repos))

it('should return a list of comments of a given article', async () => {
  // ARRANGE (Given)
  const articleId = 5

  // ACT (When)
  const commentsFound = await find({ articleId })

  // ASSERT (Then)
  expect(commentsFound).toMatchObject([{ articleId }, { articleId }])
})
