/* eslint-disable no-console */
import 'dotenv/config';
import SQLite, { type Database } from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';
import { migrateToLatest } from '.';

async function migrateDefault(url: string) {
  const db = new Kysely<Database>({
    dialect: new SqliteDialect({
      database: new SQLite(url),
    }),
  });

  const { results, error } = await migrateToLatest(db);

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error('failed to migrate');
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

if (require.main === module) {
  const { DATABASE_URL } = process.env;

  if (typeof DATABASE_URL !== 'string') {
    throw new Error('Provide DATABASE_URL in your environment variables.');
  }

  migrateDefault(DATABASE_URL);
}
