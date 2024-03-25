import {
  Project,
  projectSchema,
  type ProjectBare,
} from '@server/entities/project'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import { TRPCError } from '@trpc/server'

export default authenticatedProcedure
  .input(projectSchema.shape.id)
  .query(async ({ input: projectId, ctx: { authUser, db } }) => {
    // Unfortunately TypeORM does not present correct types
    // for selected relations. We add a type assertion here.
    const project = (await db.getRepository(Project).findOne({
      where: { id: projectId },
    })) as ProjectBare

    if (!project) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Project was not found`,
      })
    }

    // We could also require user to specify their id in the query
    // and then perform a where: { id: projectId, userId: authUser.id }
    // query.
    if (project.userId !== authUser.id) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `You are not allowed to access this project.`,
      })
    }

    return project
  })
