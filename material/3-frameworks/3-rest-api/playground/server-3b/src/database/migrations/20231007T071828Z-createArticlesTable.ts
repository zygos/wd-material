import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('article')
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('title', 'text', (column) => column.notNull())
    .addColumn('content', 'text', (column) => column.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('article').execute();
}
