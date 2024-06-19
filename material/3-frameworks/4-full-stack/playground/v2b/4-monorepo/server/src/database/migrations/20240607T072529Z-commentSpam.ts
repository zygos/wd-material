import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('comment')
    .addColumn('is_spam', 'boolean', (c) => c.defaultTo(false).notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable('comment').dropColumn('is_spam').execute()
}
