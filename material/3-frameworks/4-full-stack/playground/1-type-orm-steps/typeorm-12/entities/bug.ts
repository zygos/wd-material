import { validates } from '@shared/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { Project } from '.'

@Entity()
export class Bug {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('integer')
  projectId: number

  @ManyToOne(() => Project, (project) => project.bugs)
  @JoinColumn()
  project: Project

  @Column('text')
  name: string

  @Column('text', { nullable: true })
  code: string | null

  @Column('text', { nullable: true })
  stacktrace: string | null
}

type BugModel = Omit<Bug, 'project'>

export const bugSchema = validates<BugModel>().with({
  id: z.number().int().positive(),
  projectId: z.number().positive(),
  code: z.string().nullable(),
  name: z.string().trim(),
  stacktrace: z.string().nullable(),
})

export const bugInsertSchema = bugSchema.omit({ id: true })

export type BugInsert = z.infer<typeof bugInsertSchema>
