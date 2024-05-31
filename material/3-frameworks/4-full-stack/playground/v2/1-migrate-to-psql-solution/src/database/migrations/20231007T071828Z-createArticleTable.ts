import { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  // postgres
  await db.schema
    .createTable('article')

    // NEW: instead of auto-increment, we use generatedAlwaysAsIdentity
    // because it is the recommended way to create identity columns in
    // Postgres.
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )

    .addColumn('title', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('article').execute()
}
