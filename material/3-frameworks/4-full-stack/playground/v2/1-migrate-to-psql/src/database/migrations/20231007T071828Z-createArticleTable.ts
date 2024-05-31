import { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  // postgres
  await db.schema
    .createTable('article')
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement())
    .addColumn('title', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('article').execute()
}
