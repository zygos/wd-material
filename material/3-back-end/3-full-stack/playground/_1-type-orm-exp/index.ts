import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// If we do not specifiy the table name, it will be inferred from the class.
// In that case, it would be called "movie". It is a fine name, but we will
// stick to original table names that we are familiar with.
@Entity('movies')
export class Movie {
  // We would prefer to use 'identity' in PostgreSQL, but there is an issue
  // with typeORM not returning the id after insert, so we will use 'increment'.
  // For small applications, this is not a big deal.
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
}
