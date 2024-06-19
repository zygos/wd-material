import { commentSchema, type CommentPublic } from '@server/entities/comment'
import provideRepos from '@server/trpc/provideRepos'
import { commentRepository } from '@server/repositories/commentRepository'
import { publicProcedure } from '@server/trpc'

export default publicProcedure
  .use(
    provideRepos({
      commentRepository,
    })
  )
  .input(
    commentSchema.pick({
      articleId: true,
    })
  )
  .query(
    async ({
      input: { articleId },
      ctx: { repos },
    }): Promise<CommentPublic[]> => {
      const comments = await repos.commentRepository.findByArticleId(articleId)

      return comments
    }
  )
