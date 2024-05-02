import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('category')
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('name', 'text', (column) => column.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('category').execute();
}
