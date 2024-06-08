import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { projectRepository } from '@server/repositories/projectRepository'
import { idSchema } from '@server/entities/shared'
import provideRepos from '../provideRepos'

export const projectIdOwnerProcedure = authenticatedProcedure
  .use(
    provideRepos({
      projectRepository,
    })
  )
  .input(
    z.object({
      projectId: idSchema,
    })
  )
  .use(async ({ input: { projectId }, ctx: { authUser, repos }, next }) => {
    const hasSameUserId = await repos.projectRepository.hasUserId(
      projectId,
      authUser.id
    )

    if (!hasSameUserId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Project does not belong to the user',
      })
    }

    return next()
  })
