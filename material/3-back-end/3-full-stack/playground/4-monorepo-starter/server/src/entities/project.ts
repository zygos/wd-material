import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { Bug } from './bug'
import { User } from './user'

@Entity()
export class Project {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  userId: number

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn()
  user: User

  @Column('text')
  name: string

  @OneToMany(() => Bug, (bug) => bug.project, {
    cascade: ['insert'],
  })
  bugs: Bug[]
}

export type ProjectBare = Omit<Project, 'user' | 'bugs'>

export const projectSchema = validates<ProjectBare>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  name: z
    .string()
    .trim()
    // with a friendly error message
    .min(2, 'Project name must be at least 2 characters long')
    .max(100),
})

export const projectInsertSchema = projectSchema.omit({ id: true })

export type ProjectInsert = z.infer<typeof projectInsertSchema>
