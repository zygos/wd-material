import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Movie } from './movie'

@Entity('rating')
export class Rating {
  @PrimaryColumn('integer')
  movieId: number

  @Column('real')
  rating: number

  @Column('integer')
  votes: number

  @OneToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie
}
