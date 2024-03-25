import type { MigrationProvider, Migration } from 'kysely';

/**
 * This migration provider is used when running migrations from the
 * ES module environment. It uses the import.meta.glob function to
 * find all the migrations.
 */
export default class ModuleMigrationProvider implements MigrationProvider {
  // eslint-disable-next-line class-methods-use-this
  async getMigrations(): Promise<Record<string, Migration>> {
    // @ts-ignore
    const migrations: Record<string, Migration> = import.meta.glob(
      // hard-coded due to how import.meta.glob works
      '../../../src/database/migrations/**.ts',
      {
        eager: true,
      }
    );

    return migrations;
  }
}
