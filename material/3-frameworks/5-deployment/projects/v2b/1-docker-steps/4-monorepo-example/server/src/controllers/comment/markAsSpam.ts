import { idSchema } from '@server/entities/shared'
import { commentRepository } from '@server/repositories/commentRepository'
import { articleAuthorProcedure } from '@server/trpc/articleAuthorProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { assertError } from '@server/utils/errors'
import type { CommentPublic } from '@server/entities/comment'

export default articleAuthorProcedure
  .use(
    provideRepos({
      commentRepository,
    })
  )
  .input(
    z.object({
      id: idSchema,
    })
  )
  .mutation(
    async ({ input: { id }, ctx: { repos } }): Promise<CommentPublic> => {
      try {
        const commentUpdated = await repos.commentRepository.markAsSpam(id)

        return commentUpdated
      } catch (error) {
        assertError(error)

        if (error.message.includes('no result')) {
          // return an error with the correct code
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Comment not found',
          })
        }

        // let other errors bubble up
        throw error
      }
    }
  )
