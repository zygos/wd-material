import createDatabase from '@server/database'

export default function createTestDatabase(url = process.env.DATABASE_URL!) {
  // hard-coded paths due to how import.meta.glob works
  const entities = import.meta.glob('../../../src/database/entities/**.ts', {
    eager: true,
  })
  const migrations = import.meta.glob(
    '../../../src/database/migrations/**.ts',
    { eager: true }
  )

  const mergeShallowAll = (objects: Record<string, unknown>[]) =>
    objects.reduce((acc, object) => ({ ...acc, ...object }), {})

  return createDatabase(url, {
    entities: mergeShallowAll(Object.values(entities) as any),
    migrations: mergeShallowAll(Object.values(migrations) as any),
  })
}
