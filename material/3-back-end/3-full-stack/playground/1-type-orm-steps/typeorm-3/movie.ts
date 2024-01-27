import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column('text')
  title: string

  @Column('integer')
  year: number
}
