import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

@Entity()
export class Dog {
  @PrimaryGeneratedColumn('identity')
  id: number

  @Column('text')
  name: string

  @Column('boolean', { default: true })
  isGoodDog: boolean

  @Column('text', { nullable: true })
  image: string | null
}

export const dogSchema = validates<Dog>().with({
  id: z.number().int().positive(),
  name: z.string().trim(),
  isGoodDog: z.boolean(),

  // In our simple example, we will provide a relative path to a JPG.
  image: z
    .string()
    .regex(/^\/dogs\/[\w-]+\.jpe?g$/)
    .nullable(),
})

export const dogInsertSchema = dogSchema.omit({ id: true }).extend({
  isGoodDog: dogSchema.shape.isGoodDog.default(true),
  image: dogSchema.shape.image.default(null),
})

export type DogInsert = z.infer<typeof dogInsertSchema>
