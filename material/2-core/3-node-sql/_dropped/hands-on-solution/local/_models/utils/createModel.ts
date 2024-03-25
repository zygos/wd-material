import { z } from 'zod'
import { type Database } from '../../../database'

export default <T extends { id: number }>(
  tableName: string,
  fields: Record<string, z.ZodType>
) => {
  if (!fields.id) throw new Error('id field is required')
  if (/^[a-z_]+$/.test(tableName)) throw new Error('Invalid table name')

  const columns = Object.keys(fields) as (keyof T & string)[]
  const toId = (record: Pick<T, 'id'>) => record.id

  return (database: Database) => ({
    async findAll(select = [] as (keyof T & string)[]) {
      if (!select.length) select = columns

      const sql = `SELECT ${select} FROM ${tableName}`

      return (await database.query(sql)) as Pick<T, (typeof select)[number]>[]
    },
    async syncAll(wanted: T[]) {
      const idsExisting = (await this.findAll(['id'])).map(toId)
      const idsWanted = wanted.map(toId)

      const toRemove = idsExisting
        .filter(id => !idsWanted.includes(id))
        .map(id => ({ id }))

      await this.upsertAll(wanted)
      await this.removeAll(toRemove)
    },

    async upsertAll(records: T[]) {
      if (!records.length) return []

      const values = records.map(record =>
        columns.map(column => record[column])
      )
      const placeholders = formPlaceholders(values)

      // trusted column names as these are provided in the code
      const columnsString = columns.join(', ')

      const onConflict = columns
        .filter(column => column !== 'id')
        .map(column => `${column} = excluded.${column}`)
        .join(', ')

      return database.query(
        `INSERT INTO ${tableName} (${columnsString})
        VALUES ${placeholders}
        ON CONFLICT (id) DO UPDATE SET ${onConflict}`,
        values.flat()
      )
    },

    async removeAll(records: Pick<T, 'id'>[]) {
      if (!records.length) return []

      const values = records.map(record => [record.id])
      const placeholders = formPlaceholders(values)

      return database.query(
        `DELETE FROM ${tableName} WHERE id IN ${placeholders}`,
        values.flat()
      )
    },
  })
}

function formPlaceholders(values: unknown[][]) {
  const joined = values
    .map(value => value.map(() => '?').join(', '))
    .join('), (')

  return `(${joined})`
}
