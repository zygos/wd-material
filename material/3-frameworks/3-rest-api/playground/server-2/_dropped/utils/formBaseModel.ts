import { type Kysely, type Insertable, type Updateable } from 'kysely';
import { type DB } from 'kysely-codegen';
import { omit } from 'lodash/fp';

// we are slowly approaching a class structure
export default function formBaseModel<T extends keyof DB>(
  db: Kysely<DB>,
  tableName: T,
  keys: (keyof DB[T])[]
) {
  return {
    findAll() {
      return db.selectFrom(tableName).select(keys).execute();
    },

    find(id: number) {
      return db
        .selectFrom(tableName)
        .select(keys)
        .where('id', '=', id)
        .executeTakeFirst();
    },

    create(id: Insertable<T>) {
      return db
        .insertInto(tableName)
        .values(id)
        .returning(keys)
        .executeTakeFirst();
    },

    patch(id: number, data: Updateable<T>) {
      const record = omit('id', data);

      if (Object.keys(record).length === 0) {
        return this.find(id);
      }

      return db
        .updateTable(tableName)
        .set(record)
        .where('id', '=', id)
        .returning(keys)
        .executeTakeFirst();
    },

    remove(id: number) {
      return db
        .deleteFrom(tableName)
        .where('id', '=', id)
        .returning(keys)
        .executeTakeFirst();
    },

    replace(id: number, data: Omit<Required<Updateable<T>>, 'id'>) {
      return db
        .updateTable(tableName)
        .set(data)
        .where('id', '=', id)
        .returning(keys)
        .executeTakeFirst();
    },
  };
}
