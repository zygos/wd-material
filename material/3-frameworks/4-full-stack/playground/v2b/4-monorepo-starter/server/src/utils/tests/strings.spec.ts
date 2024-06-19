import { prefixTable } from '../strings'

it('should prefix table name to keys', () => {
  const tableName = 'users'
  const keys = ['id', 'name', 'email']
  const result = prefixTable(tableName, keys)

  expect(result).toEqual(['users.id', 'users.name', 'users.email'])
})

it('should handle empty keys array', () => {
  const tableName = 'users'
  const keys: string[] = []
  const result = prefixTable(tableName, keys)

  expect(result).toEqual([])
})
