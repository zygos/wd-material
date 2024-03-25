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

  @Column('varchar', { length: 255 })
  name: string

  @Column('numeric')
  birth: number

  @ManyToMany(() => Movie, {
    cascade: ['insert'],
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

  @ManyToMany(() => Movie, {
    cascade: ['insert'],
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
}
