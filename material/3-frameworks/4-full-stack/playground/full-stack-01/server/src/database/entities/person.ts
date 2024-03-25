import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn('identity')
  id: number

  @Column('varchar', { length: 255 })
  name: string

  @Column('numeric')
  birth: number
}
