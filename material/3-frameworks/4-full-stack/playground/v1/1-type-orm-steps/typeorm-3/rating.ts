import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('ratings')
export class Rating {
  @PrimaryColumn('integer')
  movieId: number

  // We could also use an inprecise type like real or float,
  // as this is not financial data and it is would be recalculated
  // from a real list of votes anyway.
  @Column('decimal')
  rating: number

  @Column('integer')
  votes: number
}
