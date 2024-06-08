import { projectInsert } from '@server/entities/project'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { projectRepository } from '@server/repositories/projectRepository'

// We want to allow only authenticated users to create projects.
// That's why we are using authenticatedProcedure instead of publicProcedure.
// authenticatedProcedure is a middlware that checks if there is an authentication token
// provided in the request. If there is, it will set the authenticated user in the context.
// Then we can access the authenticated user in the ctx.authUser property below.
// If you would import publicProcedure and use it instead of authenticatedProcedure,
// then the procedure resolver (main function) would throw a TypeScript error that
// authUser could be undefined.
export default authenticatedProcedure

  // inject project repository into the ctx.repos
  .use(
    provideRepos({
      projectRepository,
    })
  )

  // omitting the userId, we will set it to the authenticated user id
  .input(projectInsert.omit({ userId: true }))

  // Then, we would use a new property 'repos' instead of db.
  .mutation(async ({ input: projectData, ctx: { authUser, repos } }) => {
    const project = {
      ...projectData,
      userId: authUser.id,
    }

    const projectCreated = await repos.projectRepository.create(project)

    return projectCreated
  })
