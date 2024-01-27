import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('identity')
  id: number

  @Column('varchar', { length: 255 })
  title: string

  @Column('integer')
  year: number
}
