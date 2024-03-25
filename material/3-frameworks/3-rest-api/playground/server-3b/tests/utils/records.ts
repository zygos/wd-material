import { Insertable, Kysely } from 'kysely';
import { DB } from 'kysely-codegen';

type HelperType<N extends keyof DB> = { [P in N]: DB[P] };

export const createFor =
  <N extends keyof DB, T extends HelperType<N>>(db: Kysely<T>, tableName: N) =>
  (records: Insertable<DB[N]> | Insertable<DB[N]>[]) =>
    db
      .insertInto(tableName)
      .values(records as any)
      .returningAll()
      .execute();
