import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToOne,
  JoinTable,
} from 'typeorm'
import { Rating } from './rating'
import { Person } from './person'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('identity')
  id: number

  @Column('varchar', { length: 255 })
  title: string

  @Column('integer')
  year: number

  @OneToOne(() => Rating, (rating) => rating.movie, {
    cascade: ['insert'],
  })
  rating: Rating

  @ManyToMany(() => Person, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'directors',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  directors: Person[]

  @ManyToMany(() => Person, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'stars',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'person_id',
      referencedColumnName: 'id',
    },
  })
  stars: Person[]
}
