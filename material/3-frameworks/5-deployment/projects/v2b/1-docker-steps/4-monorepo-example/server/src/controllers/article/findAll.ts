import { articleRepository } from '@server/repositories/articleRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { z } from 'zod'

const LIMIT_MAX = 2147483647

export default publicProcedure
  .use(
    provideRepos({
      articleRepository,
    })
  )
  .input(
    // example of pagination input where we ask for a specific
    // number of articles starting from a specific offset
    z
      .object({
        offset: z.number().int().min(0).max(LIMIT_MAX).default(0),
        limit: z.number().int().min(1).max(LIMIT_MAX).default(20),
      })
      .default({})
  )
  .query(async ({ input, ctx: { repos } }) => {
    const articles = await repos.articleRepository.findAll(input)

    return articles
  })
