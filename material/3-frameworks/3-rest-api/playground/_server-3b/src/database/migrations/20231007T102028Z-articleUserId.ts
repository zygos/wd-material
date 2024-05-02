import { Kysely, SqliteDatabase } from 'kysely';

export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .alterTable('article')
    .addColumn('user_id', 'integer', (column) => column.references('user.id'))
    .execute();
}

export async function down(db: Kysely<SqliteDatabase>) {
  await db.schema.alterTable('article').dropColumn('user_id').execute();
}
