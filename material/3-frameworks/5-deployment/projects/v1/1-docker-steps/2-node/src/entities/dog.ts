import { validates } from '@server/utils/validation'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

@Entity()
export class Dog {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  name: string

  @Column('boolean', { default: true })
  isGoodDog: boolean
}

export const dogSchema = validates<Dog>().with({
  id: z.number().int().positive(),
  name: z.string().trim(),
  isGoodDog: z.boolean(),
})

export const dogInsertSchema = dogSchema.omit({ id: true }).extend({
  isGoodDog: z.boolean().default(true),
})

export type DogInsert = z.infer<typeof dogInsertSchema>
