const mergeShallowAll = (objects: Record<string, unknown>[]) =>
  objects.reduce((acc, object) => ({ ...acc, ...object }), {})

export default () => {
  // hard-coded paths due to how import.meta.glob works
  const entities = import.meta.glob('../../../src/database/entities/**.ts', {
    eager: true,
  })

  return Object.values(mergeShallowAll(Object.values(entities) as any))
}
