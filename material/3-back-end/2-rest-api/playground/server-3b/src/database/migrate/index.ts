/* eslint-disable no-console */
import 'dotenv/config';
import * as path from 'path';
import { promises as fs } from 'fs';
import { FileMigrationProvider, Kysely, Migrator } from 'kysely';
import ModuleMigrationProvider from './ModuleMigrationProvider';

const MIGRATIONS_PATH = './migrations';

export async function migrateToLatest(db: Kysely<any>) {
  const provider = getProvider();
  const migrator = new Migrator({
    db,
    provider,
  });

  return migrator.migrateToLatest();
}

function getProvider() {
  // @ts-ignore
  return typeof import.meta !== 'undefined'
    ? new ModuleMigrationProvider()
    : new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, MIGRATIONS_PATH),
      });
}
