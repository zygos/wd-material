import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
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
