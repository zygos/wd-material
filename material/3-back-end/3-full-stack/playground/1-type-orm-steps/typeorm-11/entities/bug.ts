import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
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
