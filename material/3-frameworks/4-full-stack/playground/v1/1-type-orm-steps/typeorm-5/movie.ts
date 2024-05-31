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
    // On Movie insert, update, cascade down the updates.
    // Using { cascade: true } should work too, but we will conservatively
    // only allow insert and update operations to be cascaded.
    // Make sure to check the rating.ts file too!
    cascade: ['insert', 'update'],
  })
  rating: Rating
}
