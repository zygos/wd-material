import { projectIdOwnerProcedure } from '@server/trpc/projectIdOwnerProcedure'
import { type BugBare, Bug, bugSchema } from '@server/entities/bug'

export default projectIdOwnerProcedure
  .input(
    bugSchema.pick({
      projectId: true,
    })
  )
  .query(async ({ input: { projectId }, ctx: { db } }) => {
    const bugs = (await db.getRepository(Bug).find({
      where: {
        projectId,
      },
      order: { id: 'DESC' },
    })) as BugBare[]

    return bugs
  })
