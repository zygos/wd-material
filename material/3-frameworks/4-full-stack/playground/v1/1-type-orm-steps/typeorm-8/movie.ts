import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Person } from './person'
import { Rating } from './rating'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('integer')
  year: number

  @OneToOne(() => Rating, (rating) => rating.movie, {
    cascade: ['insert', 'update'],
  })
  rating: Rating

  @ManyToMany(() => Person, {
    cascade: ['insert', 'update'],
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

  @ManyToMany(() => Person, {
    cascade: ['insert', 'update'],
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
}
