import { Kysely, SqliteDatabase } from 'kysely'

/** Migration used to initialize empty database tables for the test database. */
export async function up(db: Kysely<SqliteDatabase>) {
  await db.schema
    .createTable('movies')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('year', 'numeric')
    .execute()

  await db.schema
    .createTable('people')
    .ifNotExists()
    .addColumn('id', 'integer', (c) => c.primaryKey().autoIncrement().notNull())
    .addColumn('name', 'text', (c) => c.notNull())
    .addColumn('birth', 'numeric')
    .execute()

  await db.schema
    .createTable('stars')
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('person_id', 'integer', (c) =>
      c.notNull().references('people.id')
    )
    .execute()

  await db.schema
    .createTable('directors')
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('person_id', 'integer', (c) =>
      c.notNull().references('people.id')
    )
    .execute()

  await db.schema
    .createTable('ratings')
    .ifNotExists()
    .addColumn('movie_id', 'integer', (c) =>
      c.notNull().references('movies.id')
    )
    .addColumn('rating', 'real', (c) => c.notNull())
    .addColumn('votes', 'integer', (c) => c.notNull())
    .execute()
}

export async function down() {
  // unnecessary, as this is the first migration, we can just delete the database
}
