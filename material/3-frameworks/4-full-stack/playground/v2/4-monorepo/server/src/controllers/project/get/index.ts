import { idSchema } from '@server/entities/shared'
import { projectRepository } from '@server/repositories/projectRepository'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .use(
    provideRepos({
      projectRepository,
    })
  )
  .input(idSchema)
  .query(async ({ input: projectId, ctx: { authUser, repos } }) => {
    const project = await repos.projectRepository.findById(projectId)

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project was not found',
      })
    }

    if (project.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You are not allowed to access this project.',
      })
    }

    return project
  })
