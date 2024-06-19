import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { articleRepository } from '@server/repositories/articleRepository'
import { idSchema } from '@server/entities/shared'
import provideRepos from '../provideRepos'

export const articleAuthorProcedure = authenticatedProcedure
  .use(
    provideRepos({
      articleRepository,
    })
  )
  .input(
    z.object({
      articleId: idSchema,
    })
  )
  .use(async ({ input: { articleId }, ctx: { authUser, repos }, next }) => {
    const hasSameUserId = await repos.articleRepository.hasUserId(
      articleId,
      authUser.id
    )

    if (!hasSameUserId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Article does not belong to the user',
      })
    }

    return next()
  })
