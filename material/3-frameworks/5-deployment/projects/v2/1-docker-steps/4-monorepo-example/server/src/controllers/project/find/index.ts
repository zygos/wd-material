import { projectRepository } from '@server/repositories/projectRepository'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'

export default authenticatedProcedure
  .use(
    provideRepos({
      projectRepository,
    })
  )
  .query(async ({ ctx: { authUser, repos } }) => {
    const projects = await repos.projectRepository.findAllByUserId(authUser.id)

    return projects
  })
