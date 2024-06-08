import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('email', 'text', (column) => column.notNull())
    .addColumn('password', 'text', (column) => column.notNull())
    .execute()

  await db.schema
    .createTable('project')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('name', 'text', (column) => column.notNull())
    .addColumn('user_id', 'integer', (column) =>
      column.references('user.id').notNull()
    )
    .execute()

  await db.schema
    .createTable('bug')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('name', 'text', (column) => column.notNull())
    .addColumn('code', 'text')
    .addColumn('stacktrace', 'text')
    .addColumn('resolved_at', 'timestamptz')
    .addColumn('project_id', 'integer', (column) =>
      column.references('project.id').notNull()
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('bug').execute()
  await db.schema.dropTable('project').execute()
  await db.schema.dropTable('user').execute()
}
