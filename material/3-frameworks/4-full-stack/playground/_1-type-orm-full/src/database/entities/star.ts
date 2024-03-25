import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Movie } from './movie'
import { Person } from './person'

@Entity('stars')
export class Star {
  @PrimaryColumn('integer')
  movieId: string

  @PrimaryColumn('integer')
  personId: number

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movies: Movie

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person: Person
}
