import { TRPCError } from '@trpc/server'
import z from 'zod'
import { Project } from '@server/entities'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '../provideRepos'

export const projectIdOwnerProcedure = authenticatedProcedure
  .use(provideRepos({ Project }))
  .input(
    z.object({
      projectId: z.number(),
    })
  )
  .use(async ({ input: { projectId }, ctx: { authUser, repos }, next }) => {
    const project = await repos.Project.findOne({
      select: {
        userId: true,
      },
      where: {
        id: projectId,
      },
    })

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project not found',
      })
    }

    if (project.userId !== authUser.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Project does not belong to the user',
      })
    }

    return next()
  })
