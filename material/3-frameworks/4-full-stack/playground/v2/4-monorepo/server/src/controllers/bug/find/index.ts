import { projectIdOwnerProcedure } from '@server/trpc/projectIdOwnerProcedure'
import { bugBase } from '@server/entities/bug'
import provideRepos from '@server/trpc/provideRepos'
import { bugRepository } from '@server/repositories/bugRepository'

export default projectIdOwnerProcedure
  .use(
    provideRepos({
      bugRepository,
    })
  )
  .input(
    bugBase.pick({
      projectId: true,
    })
  )
  .query(async ({ input: { projectId }, ctx: { repos } }) => {
    const bugs = await repos.bugRepository.findAllByProjectId(projectId)

    return bugs
  })
