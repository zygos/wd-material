import { bugInsert } from '@server/entities/bug'
import { bugRepository } from '@server/repositories/bugRepository'
import { projectRepository } from '@server/repositories/projectRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

// This is a public procedure, so we don't need to check
// if the user is authenticated.
export default publicProcedure
  .use(
    provideRepos({
      projectRepository,
      bugRepository,
    })
  )
  .input(bugInsert)
  .mutation(async ({ input: bug, ctx: { repos } }) => {
    const project = await repos.projectRepository.findById(bug.projectId)

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project not found',
      })
    }

    const bugCreated = await repos.bugRepository.create(bug)

    return bugCreated
  })
