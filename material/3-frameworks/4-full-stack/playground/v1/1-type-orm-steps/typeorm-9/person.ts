import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Movie } from '.'

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  name: string

  @Column('integer', { nullable: true })
  birth: number | null

  @ManyToMany(() => Movie, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'stars',
    joinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
  })
  starred: Movie[]

  @ManyToMany(() => Movie, {
    cascade: ['insert', 'update'],
  })
  @JoinTable({
    name: 'directors',
    joinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
  })
  directed: Movie[]
}
