import { Kysely, SqliteDatabase, sql } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('first_name', 'text', (column) => column.notNull())
    .addColumn('last_name', 'text', (column) => column.notNull())
    .execute();

  await db.schema
    .createTable('comment')
    .addColumn('id', 'integer', (column) =>
      column.primaryKey().autoIncrement().notNull()
    )
    .addColumn('user_id', 'integer', (column) =>
      column.references('user.id').notNull()
    )
    .addColumn('article_id', 'integer', (column) =>
      column.references('article.id').notNull()
    )
    .addColumn('content', 'text', (column) => column.notNull())
    .addColumn('created_at', 'datetime', (column) =>
      column.notNull().defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.dropTable('comment').execute();
  await db.schema.dropTable('user').execute();
}
