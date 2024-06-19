import { type Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  // postgres
  await db.schema
    .createTable('user')

    // NEW: instead of auto-increment, we use generatedAlwaysAsIdentity
    // because it is the recommended way to create identity columns in
    // Postgres.
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )

    .addColumn('first_name', 'text', (column) => column.notNull())
    .addColumn('last_name', 'text', (column) => column.notNull())
    .execute()

  await db.schema
    .createTable('comment')

    // NEW: instead of auto-increment, we use generatedAlwaysAsIdentity
    // because it is the recommended way to create identity columns in
    // Postgres.
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('user_id', 'integer', (column) =>
      column.references('user.id').notNull()
    )
    .addColumn('article_id', 'integer', (column) =>
      column.references('article.id').notNull()
    )
    .addColumn('content', 'text', (column) => column.notNull())

    // NEW: instead of datetime, we use timestamptz because it is the
    // recommended way to store timestamps in Postgres. Also, it stores
    // the timezone information, so it is more resilient to changes in
    // the database timezone settings, daylight saving time, etc.
    .addColumn('created_at', 'timestamptz', (column) =>
      column.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('comment').execute()
  await db.schema.dropTable('user').execute()
}
