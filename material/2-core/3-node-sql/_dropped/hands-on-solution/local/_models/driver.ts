import { z } from 'zod'
import { type Database } from '../../database'
import formPlaceholders from './utils/formPlaceholders'

const TABLE = 'driver'

const driverMap = {
  id: z.number(),
  name: z.string(),
  license_number: z.string(),
}

const columns = Object.keys(driverMap) as (keyof typeof driverMap)[]
const driverSchema = z.object(driverMap)

type Driver = z.infer<typeof driverSchema>

export default (database: Database) => ({
  async findAll() {
    return (await database.query(`SELECT * FROM ${TABLE}`)) as Driver[]
  },
  async insertAll(drivers: Driver[]) {
    if (!drivers?.length) return []

    const values = drivers.map(driver => columns.map(key => driver[key]))
    const placeholders = formPlaceholders(values)

    return database.query(
      `INSERT INTO ${TABLE} (${columns.join(', ')}) VALUES (${placeholders})`,
      values.flat()
    )
  },
})
