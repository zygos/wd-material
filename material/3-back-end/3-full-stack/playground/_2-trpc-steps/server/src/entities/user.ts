import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm'
import { z } from 'zod'
import { Project } from './project'

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Unique(['email'])
  @Column('text')
  email: string

  @Column('text')
  password: string

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]
}

type UserModel = Omit<User, 'projects'>

export const userSchema = validates<UserModel>().with({
  id: z.number().int().positive(),

  // We will trim and lowercase all emails, otherwise
  // lots of users will be frustrated when they try to
  // log in with "email@example" while they have
  // registered with "Email@example.com".
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
})

export const userInsertSchema = userSchema.omit({ id: true })

export type UserInsert = z.infer<typeof userInsertSchema>
