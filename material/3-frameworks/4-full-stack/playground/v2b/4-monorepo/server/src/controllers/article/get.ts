import { idSchema } from '@server/entities/shared'
import { articleRepository } from '@server/repositories/articleRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

export default publicProcedure
  .use(
    provideRepos({
      articleRepository,
    })
  )
  .input(idSchema)
  .query(async ({ input: articleId, ctx: { repos } }) => {
    const article = await repos.articleRepository.findById(articleId)

    if (!article) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Article was not found',
      })
    }

    return article
  })
