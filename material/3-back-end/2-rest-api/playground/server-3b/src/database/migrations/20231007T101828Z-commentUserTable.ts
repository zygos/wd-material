import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('username', 'text', (column) => column.notNull())
    .execute();

  await db.schema
    .createTable('comment')
    .addColumn('id', 'integer', (column) => column.primaryKey().autoIncrement())
    .addColumn('user_id', 'integer', (column) =>
      column.references('user.id').notNull()
    )
    .addColumn('content', 'text', (column) => column.notNull())
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('comment').execute();
  await db.schema.dropTable('user').execute();
}
