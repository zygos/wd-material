import { CamelCasePlugin, Kysely, SqliteDialect } from 'kysely';
import { DB } from 'kysely-codegen';
import SQLite from 'better-sqlite3';
import { migrateToLatest } from '@/database/migrate';

const DATABASE_FILE = ':memory:';

export default async () => {
  const database = new Kysely<DB>({
    dialect: new SqliteDialect({ database: new SQLite(DATABASE_FILE) }),
    plugins: [new CamelCasePlugin()],
  });

  const { results, error } = await migrateToLatest(database);

  results
    ?.filter((result) => result.status === 'Error')
    .forEach((result) => {
      console.error(`failed to execute migration "${result.migrationName}"`);
    });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
  }

  return database;
};
