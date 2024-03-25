import { beforeEach, expect, it } from 'vitest'
import { join } from 'path'
import { mkdir, readFile, rm } from 'fs/promises'
import exportSpreadsheet from '../src/exportSpreadsheet'
import importSpreadsheet from '../src/importSpreadsheet'

const fixture = (...paths: string[]) => join(__dirname, 'fixtures', ...paths)

beforeEach(async () => {
  // remove the previous temporary directory
  await rm(fixture('$temp'), { force: true, recursive: true })

  // create a temporary directory for the database
  await mkdir(fixture('$temp'))
})

// goes through the flow in its entirety, including real I/O
it('preserves the same file output as the input used for creating a database', async () => {
  const csvOriginal = await readFile(fixture('data.csv'), 'utf-8')

  await importSpreadsheet(fixture('$temp/database.sqlite'), fixture('data.csv'))

  await exportSpreadsheet(
    fixture('$temp/database.sqlite'),
    fixture('$temp/exported.csv'),
  )

  const csvExported = await readFile(fixture('$temp/exported.csv'), 'utf-8')

  const csvOriginalLines = csvOriginal.split('\n')
  const csvExportedLines = csvExported.split('\n')

  expect(csvExportedLines.length).toBe(csvOriginalLines.length)

  // compare line-by-line for clearer error messages
  csvOriginalLines.forEach((line, index) => {
    expect(csvExportedLines[index]).toBe(line)
  })

  // compare the whole string
  expect(csvExported).toBe(csvOriginal)
})
