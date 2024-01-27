import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { Movie } from './movie'
import { Person } from './person'

// we are specifying the table name here because the table name is not
// "director", but "directors"
@Entity('directors')
export class Director {
  // We are specifying the column type.
  // Most tables generally have `id` as their primary key, but in this case
  // we have a composite primary key - the combination of `movie_id` and
  // `person_id` is unique. It is possible to have a primary key as `id`
  // and then have a unique constraint on the combination of a few other
  // columns, but in this case we will use a composite primary key to be
  // consistent the original table structure.
  @PrimaryColumn('integer')
  movieId: string

  @PrimaryColumn('integer')
  personId: number

  // A function that returns the class of the entity that we are joining to.
  @ManyToOne(() => Movie)

  // Joining on the `movie_id` column, we could have omitted this if the
  // column name would match the name of the table + "_id". In our case,
  // it does not (the column name is `movie_id`, while the automatically
  // generated column name would be `movies_id`), so we are specifying
  // the column name explicitly.
  @JoinColumn({ name: 'movie_id' })
  movie: Movie

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person
}
