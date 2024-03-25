import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Movie } from './movie'

@Entity('ratings')
export class Rating {
  @PrimaryColumn('integer')
  movieId: number

  @Column('decimal')
  rating: number

  @Column('integer')
  votes: number

  @OneToOne(() => Movie, {
    // on Movie delete, cascade down the delete to the Rating
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  movie: Movie
}
