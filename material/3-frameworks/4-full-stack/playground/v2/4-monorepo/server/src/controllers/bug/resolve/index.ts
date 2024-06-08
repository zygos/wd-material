import { idSchema } from '@server/entities/shared'
import { bugRepository } from '@server/repositories/bugRepository'
import { projectIdOwnerProcedure } from '@server/trpc/projectIdOwnerProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { assertError } from '@server/utils/errors'
import type { Bug } from '@server/database'
import { NoResultError, type Selectable } from 'kysely'

export default projectIdOwnerProcedure
  .use(
    provideRepos({
      bugRepository,
    })
  )
  .input(
    z.object({
      id: idSchema,
    })
  )
  .mutation(
    async ({ input: { id }, ctx: { repos } }): Promise<Selectable<Bug>> => {
      try {
        const bugUpdated = await repos.bugRepository.update(id, {
          resolvedAt: new Date(),
        })

        return bugUpdated
      } catch (error) {
        assertError(error)

        if (error instanceof NoResultError) {
          // throw an error with the correct HTTP code and more understandable message
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Bug not found',
          })
        }

        // let other errors bubble up
        throw error
      }
    }
  )
