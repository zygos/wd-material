import { Project } from '@server/entities'
import { projectInsertSchema } from '@server/entities/project'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'

// A more advanced example for demonstration purposes.
// Here we are addressing one pesky issue. If we are testing our procedure
// we need to look at its source code to know which repositories it needs.
// This is manageable when our procedure is simple, but as it grows,
// it becomes harder to keep track of its dependencies and tests become much
// harder to write.
// Ideally, our procedure should be up-front about its dependencies instead
// of hiding behind db.getRepository(...). It should tell us what it needs to work
// and then it should be able to work with what we give it instead of it reaching
// out to the database directly and getting repositories dynamically.
export default authenticatedProcedure
  // Here, we added an utility function for injecting repositories.
  // In production, it would provide real repositories from the database.
  // In tests, it would provide mock repositories.
  .use(provideRepos({ Project }))

  // omitting the userId, we will set it to the authenticated user id
  .input(projectInsertSchema.omit({ userId: true }))

  // Then, we would use a new property 'repos' instead of db.
  .mutation(async ({ input: projectData, ctx: { authUser, repos } }) => {
    const project = {
      ...projectData,
      userId: authUser.id,
    }

    // Now, we are taking away the responsibility of getting the repository
    // from the procedure. It needs to tell us what it needs and we will provide it.
    // This is a better approach for testing.
    // If we would use repos.Bug or repos.User, we would get a type error about
    // it potentially being undefined. This is a good thing, because it forces us
    // to provide the repository.
    const projectCreated = await repos.Project.save(project)

    return projectCreated
  })
