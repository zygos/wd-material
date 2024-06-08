import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .alterTable('user')
    .addUniqueConstraint('unique_email', ['email'])
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.alterTable('user').dropConstraint('unique_email').execute()
}
