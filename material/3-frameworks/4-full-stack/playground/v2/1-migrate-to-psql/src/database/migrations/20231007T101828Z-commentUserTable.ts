import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement())
    .addColumn('first_name', 'text', (column) => column.notNull())
    .addColumn('last_name', 'text', (column) => column.notNull())
    .execute()

  await db.schema
    .createTable('comment')
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement())
    .addColumn('user_id', 'integer', (column) =>
      column.references('user.id').notNull()
    )
    .addColumn('article_id', 'integer', (column) =>
      column.references('article.id').notNull()
    )
    .addColumn('content', 'text', (column) => column.notNull())
    .addColumn('created_at', 'datetime', (column) =>
      column.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('comment').execute()
  await db.schema.dropTable('user').execute()
}
