import { Bug } from '@server/entities'
import { bugSchema } from '@server/entities/bug'
import { projectIdOwnerProcedure } from '@server/trpc/projectIdOwnerProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'

// A more advanced example for demonstration purposes.
// Here we are addressing one pesky issue. If we are testing our procedure
// we need to look at its source code to know which repositories it needs.
// This is manageable for a small procedure, but as it grows, it becomes harder
// to keep track of its dependencies and tests become much harder to write.
//
// Ideally, our procedure should be up-front about its dependencies instead
// of hiding behind db.getRepository(...). It should tell us what it needs to work
// and then it should be able to work with what we give it instead of it reaching
// out to the database directly and getting repositories dynamically.
export default projectIdOwnerProcedure
  .use(provideRepos({ Bug }))
  .input(bugSchema.pick({ id: true }))
  .mutation(async ({ input: { id }, ctx: { repos } }) => {
    // does not return the updated bug, returns an object with the number of affected rows
    const { affected } = await repos.Bug.update(
      {
        id,
      },
      {
        resolvedAt: new Date(),
      }
    )

    if (affected === 0) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Bug not found.',
      })
    }

    const bugUpdated = await repos.Bug.findOneByOrFail({
      id,
    })

    return bugUpdated
  })
