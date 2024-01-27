import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number

  // We could use a varchar, varchar with a limit (e.g. 'varchar', { length: 255 }).
  // We are using text because for PostgreSQL and SQLite, there is no difference between
  // varchar and text. For MySQL, there is a difference, so you can use varchar if you want.
  // https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_varchar.28n.29_by_default
  @Column('text')
  title: string

  @Column('integer')
  year: number
}
