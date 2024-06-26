import { articleRepository } from '@server/repositories/articleRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { z } from 'zod'

const POSTGRES_INT_MAX = 2147483647

export default publicProcedure
  .use(
    provideRepos({
      articleRepository,
    })
  )
  .input(
    // Example of pagination input where we ask for a specific
    // number of articles starting from a specific offset.
    // In any non-trivial application, you would want to use
    // pagination to avoid loading and sending all articles
    // to the client at once.
    // The client would ask for a specific range of articles
    // for example [0 - 20], [20 - 40], [40 - 60], etc.
    z
      .object({
        offset: z.number().int().min(0).max(POSTGRES_INT_MAX).default(0),
        limit: z.number().int().min(1).max(100).default(20),
      })
      .default({})
  )
  .query(async ({ input, ctx: { repos } }) => {
    const articles = await repos.articleRepository.findAll(input)

    return articles
  })
