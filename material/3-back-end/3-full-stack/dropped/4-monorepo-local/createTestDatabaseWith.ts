type EntityMap = Partial<Record<keyof typeof entities, any[]>>

/**
 * Creates a test database with the given seed data.
 * @example createTestDatabaseWith({ User: [fakeUser()] })
 * @param seedData - The seed data to populate the database with.
 * @returns A Promise that resolves to the TypeORM DataSource.
 */
export async function createTestDatabaseWith<T extends EntityMap>(seedData: T) {
  const db = await createTestDatabase()

  const saved = {} as T

  // eslint-disable-next-line no-restricted-syntax
  for await (const [entityName, records] of Object.entries(seedData) as [
    keyof T,
    any[],
  ][]) {
    const repository = db.getRepository(entityName as keyof typeof entities)
    saved[entityName] = (await repository.save(records)) as T[keyof T]
  }

  return { db, saved }
}
