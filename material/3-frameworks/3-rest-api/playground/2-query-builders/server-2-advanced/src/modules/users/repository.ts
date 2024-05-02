import type { Insertable, Selectable, Updateable } from 'kysely'
import { keys } from './schema'
import db, { type User } from '@/database'

// model-specific code
const TABLE = 'user'
type Row = User
type RowWithoutId = Omit<Row, 'id'>
type RowInsert = Insertable<RowWithoutId>
type RowUpdate = Updateable<RowWithoutId>
type RowSelect = Selectable<Row>

export function findAll(): Promise<RowSelect[]> {
  return db.selectFrom(TABLE).select(keys).execute()
}

export function findById(id: number): Promise<RowSelect | undefined> {
  return db
    .selectFrom(TABLE)
    .select(keys)
    .where('id', '=', id)
    .executeTakeFirst()
}

export function create(id: RowInsert): Promise<RowSelect | undefined> {
  return db.insertInto(TABLE).values(id).returning(keys).executeTakeFirst()
}

export function update(
  id: number,
  partial: RowUpdate
): Promise<RowSelect | undefined> {
  if (Object.keys(partial).length === 0) {
    return findById(id)
  }

  return db
    .updateTable(TABLE)
    .set(partial)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst()
}

export function remove(id: number) {
  return db
    .deleteFrom(TABLE)
    .where('id', '=', id)
    .returning(keys)
    .executeTakeFirst()
}
