import { Dog } from '@server/entities'
import { dogInsertSchema } from '@server/entities/dog'
import { publicProcedure, router } from '@server/trpc'

export default router({
  create: publicProcedure
    .input(dogInsertSchema.extend({
      // add a default value in the default dogInsertSchema
      name: dogInsertSchema.shape.name.default('Doggo'),
    }))
    .mutation(({ input: dog, ctx: { db } }) => {
      return db.getRepository(Dog).save(dog)
    }),

  findAll: publicProcedure.query(({ ctx: { db } }) => {
    return db.getRepository(Dog).find()
  }),
})
