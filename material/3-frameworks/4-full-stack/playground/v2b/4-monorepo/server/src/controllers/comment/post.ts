import { commentSchema, type CommentPublic } from '@server/entities/comment'
import { commentRepository } from '@server/repositories/commentRepository'
import { articleRepository } from '@server/repositories/articleRepository'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'

export default authenticatedProcedure
  .use(
    provideRepos({
      articleRepository,
      commentRepository,
    })
  )
  .input(
    commentSchema.pick({
      articleId: true,
      content: true,
    })
  )
  .mutation(
    async ({
      input: comment,
      ctx: { authUser, repos },
    }): Promise<CommentPublic> => {
      // We alternatively could try inserting the comment into the database
      // directly and then handle foreign key constraint violation error
      // that would be thrown by the database if the articleId is invalid.
      // However, doing an explicit check is also fine.
      const article = await repos.articleRepository.findById(comment.articleId)

      if (!article) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Article not found',
        })
      }

      // const commentCreated = await repos.commentRepository.create({
      //   ...comment,
      //   userId: authUser.id,
      // })

      // Or alternatively, just try inserting the comment into the database
      // and handle the foreign key constraint violation error
      const commentCreated = await repos.commentRepository
        .create({
          ...comment,
          userId: authUser.id,
        })
        .catch((error) => {
          // foreign key constraint violation
          if (error.code === '23503') {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'Article not found',
              cause: error,
            })
          }

          throw error
        })

      return commentCreated
    }
  )
