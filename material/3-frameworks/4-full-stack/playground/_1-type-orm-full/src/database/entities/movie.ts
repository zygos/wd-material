import {
  Check,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Rating } from './rating'
import { Person } from './person'

@Entity('movies')
// If we want to enforce some checks on the data that is being inserted,
// we can use the @Check decorator.
// See: https://typeorm.io/decorator-reference#check
@Check('"year" > 1700')
export class Movie {
  // We would prefer to use 'identity' in PostgreSQL, but there is an issue
  // with typeORM not returning the id after insert, so we will use 'increment'
  // for this example.
  @PrimaryGeneratedColumn('increment')
  id: number

  // Adds a limit of 255 characters to the column.
  @Column('varchar', { length: 255 })
  title: string

  @Column('integer')
  year: number

  @OneToOne(() => Rating, (rating) => rating.movie, {
    // in the optional third argument we can specify additional options,
    // such as cascade. Cascading automatically inserts and
    // removes the rating when inserting/removing the movie.
    // See: https://typeorm.io/relations#cascades
    cascade: ['insert', 'remove'],
  })
  rating: Rating

  // an example of many-to-many relationship, which is a bit more complex
  @ManyToMany(() => Person, {
    cascade: ['insert'],
  })
  // here we are joining people through the "directors" table
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
