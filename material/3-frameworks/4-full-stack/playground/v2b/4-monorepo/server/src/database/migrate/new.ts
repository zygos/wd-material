/* eslint-disable no-console */
// Usage: npm run migrate:new $migrationName

import fs from 'node:fs/promises'

const migrationContent = `
import type { Kysely } from 'kysely'

export async function up(db: Kysely<any>) {
}

export async function down(db: Kysely<any>) {
}
`.slice(1)

async function createMigrationFile(migrationName: string) {
  const timestamp = `${new Date().toISOString().replace(/[-:.]/g, '').slice(0, -4)}Z`
  const fileName = `${timestamp}-${migrationName}.ts`
  const filePath = `./src/database/migrations/${fileName}`

  await fs.writeFile(filePath, migrationContent)

  return filePath
}

const migrationName = process.argv[2]
if (migrationName) {
  try {
    const filePath = await createMigrationFile(migrationName)
    console.log(`Created new migration file: ${filePath}`)
  } catch (error) {
    console.error('Failed to create migration file:', error)
  }
} else {
  console.error('Please provide a migration name.')
}
