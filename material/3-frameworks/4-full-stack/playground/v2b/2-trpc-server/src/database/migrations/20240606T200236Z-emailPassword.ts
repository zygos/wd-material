import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  // MUST: move this into a step for learners to do
  await db.schema
    .alterTable('user')
    .addColumn('email', 'text', (c) => c.unique().notNull())
    .addColumn('password', 'text', (c) => c.notNull())
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema
    .alterTable('user')
    .dropColumn('email')
    .dropColumn('password')
    .execute()
}
