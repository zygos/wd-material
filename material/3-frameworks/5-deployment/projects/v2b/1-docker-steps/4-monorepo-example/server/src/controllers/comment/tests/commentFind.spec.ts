import { authRepoContext } from '@tests/utils/context'
import { createCallerFactory } from '@server/trpc'
import type { CommentRepository } from '@server/repositories/commentRepository'
import { fakeComment } from '@server/entities/tests/fakes'
import commentRouter from '..'

// Example of simple mocked repositories, which allows skipping the database
// setup altogether. This is an alternative to using a database in tests.
const repos = {
  commentRepository: {
    findByArticleId: async (articleId: number) => [
      fakeComment({
        id: 1,
        articleId,
        author: { id: 1, firstName: 'Jane', lastName: 'Doe' },
      }),
    ],
  } satisfies Partial<CommentRepository>,
}

const createCaller = createCallerFactory(commentRouter)
const { find } = createCaller(authRepoContext(repos))

it('should return a list of comments of a given article', async () => {
  // ARRANGE (Given)
  const articleId = 5

  // ACT (When)
  const commentsFound = await find({ articleId })

  // ASSERT (Then)
  expect(commentsFound).toMatchObject([
    { id: 1, articleId, author: { id: 1, firstName: 'Jane', lastName: 'Doe' } },
  ])
})
