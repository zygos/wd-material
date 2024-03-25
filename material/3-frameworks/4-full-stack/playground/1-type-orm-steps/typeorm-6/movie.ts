import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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
}
