import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Movie } from './movie'
import { Person } from './person'

@Entity('directors')
export class Director {
  @PrimaryColumn('integer')
  movieId: string

  @PrimaryColumn('integer')
  personId: number

  @ManyToOne(() => Movie, (movie) => movie.id)
  @JoinColumn()
  movies: Movie

  @ManyToOne(() => Person, (person) => person.id)
  @JoinColumn()
  person: Person
}
