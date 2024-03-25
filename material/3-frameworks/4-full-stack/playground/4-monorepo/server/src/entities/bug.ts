import { validates } from '@server/utils/validation'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { z } from 'zod'
import { Project } from './project'

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

  @Column('timestamp with time zone', { nullable: true })
  resolvedAt: Date | null
}

export type BugBare = Omit<Bug, 'project'>

export const bugSchema = validates<BugBare>().with({
  id: z.number().int().positive(),
  projectId: z.number().positive(),
  code: z.string().nullable(),
  name: z.string().trim(),
  stacktrace: z.string().nullable(),
  resolvedAt: z.date().nullable(),
})

export const bugInsertSchema = bugSchema
  .omit({
    id: true,
    resolvedAt: true,
  })
  .extend({
    // Inserts will add a default null value for code and stacktrace.
    // Why not default in the main bugSchema? Because if we wanted to update
    // a bug with { name: 'Updated name' } and we would use bugSchema for
    // validation, it would set code and stacktrace to null as well instead
    // of keeping the existing values.
    code: bugSchema.shape.code.default(null),
    stacktrace: bugSchema.shape.stacktrace.default(null),
  })

export type BugInsert = z.infer<typeof bugInsertSchema>
