import { validates } from '@shared/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { Bug, User } from '.'

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

  @OneToMany(() => Bug, (bug) => bug.project)
  bugs: Bug[]
}

type ProjectModel = Omit<Project, 'user' | 'bugs'>

export const projectSchema = validates<ProjectModel>().with({
  id: z.number().int().positive(),
  userId: z.number().positive(),
  name: z.string().trim(),
})

export const projectInsertSchema = projectSchema.omit({ id: true })

export type ProjectInsert = z.infer<typeof projectInsertSchema>
