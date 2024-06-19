import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('article')
    .addColumn('userId', 'integer', (c) => c.references('user.id').notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable('article').dropColumn('userId').execute()
}
