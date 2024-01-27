import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm'
import { Movie } from './movie'

@Entity('ratings')
export class Rating {
  @PrimaryColumn('integer')
  movieId: number

  @Column('real')
  rating: number

  @Column('integer')
  votes: number

  @OneToOne(() => Movie)
  @JoinColumn()
  movie: Movie
}
