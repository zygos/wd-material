import { createCallerFactory } from '@server/trpc'
import { NoResultError } from 'kysely'
import commentRouter from '..'

const createCaller = createCallerFactory(commentRouter)

// Example of testing with mocked repositories.
const repos = {
  articleRepository: {
    hasUserId: vi.fn(async () => true),
  },
  commentRepository: {
    markAsSpam: vi.fn(async (id) => ({ id, isSpam: true })),
  },
}

const { markAsSpam } = createCaller({
  authUser: { id: 1 },
  repos,
} as any)

const comment = { id: 14, articleId: 24 }

// Example with a mocked database
it('should mark a comment as spam', async () => {
  // ACT (When)
  const commentMarkedAsSpam = await markAsSpam(comment)

  // ASSERT (Then)
  expect(commentMarkedAsSpam).toMatchObject({
    id: comment.id,
    isSpam: true,
  })
})

it('should throw an error if comment is not found', async () => {
  // if update throws a Kysely NoResultError error
  repos.commentRepository.markAsSpam.mockRejectedValueOnce(
    new NoResultError({} as any)
  )

  // ACT (When) & ASSERT (Then)
  await expect(markAsSpam(comment)).rejects.toThrow(/not found/i)
})

it('should throw an error if user is not article author', async () => {
  // if hasUserId returns false
  repos.articleRepository.hasUserId.mockResolvedValueOnce(false)

  // ACT (When) & ASSERT (Then)
  await expect(markAsSpam(comment)).rejects.toThrow(/does not belong/i)
})
