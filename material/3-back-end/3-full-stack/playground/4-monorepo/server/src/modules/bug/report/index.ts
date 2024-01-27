import { Bug, Project } from '@server/entities'
import { bugInsertSchema } from '@server/entities/bug'
import { publicProcedure } from '@server/trpc'
import { TRPCError } from '@trpc/server'

// This is a public procedure, so we don't need to check
// if the user is authenticated.
export default publicProcedure
  .input(bugInsertSchema)
  .mutation(async ({ input: bug, ctx: { db } }) => {
    const project = await db.getRepository(Project).findOneBy({
      id: bug.projectId,
    })

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Project not found',
      })
    }

    const bugCreated = await db.getRepository(Bug).save(bug)

    return bugCreated
  })
