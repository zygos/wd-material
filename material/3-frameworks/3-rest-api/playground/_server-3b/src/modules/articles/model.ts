import type { Insertable, Updateable } from 'kysely';
import { omit } from 'lodash/fp';
import type { Article, Database } from '@/database';
import { keys } from './schema';

type Row = Article;
const TABLE = 'article';

// generic code, which we also could extract into a separate factory/class,
// but we won't for this simple application
export const buildRespository = (db: Database) => ({
  findAll() {
    return db.selectFrom(TABLE).select(keys).execute();
  },

  findById(id: number) {
    return db
      .selectFrom(TABLE)
      .select(keys)
      .where('id', '=', id)
      .executeTakeFirst();
  },

  create(record: Insertable<Row>) {
    return db
      .insertInto(TABLE)
      .values(record)
      .returning(keys)
      .executeTakeFirst();
  },

  patch(id: number, data: Updateable<Row>) {
    const record = omit('id', data);

    if (Object.keys(record).length === 0) {
      return this.findById(id);
    }

    return db
      .updateTable(TABLE)
      .set(record)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst();
  },

  remove(id: number) {
    return db
      .deleteFrom(TABLE)
      .where('id', '=', id)
      .returning(keys)
      .executeTakeFirst();
  },
});
