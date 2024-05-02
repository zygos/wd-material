import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const today = new Date()
const content = process.argv[2]

await createReport(today, content)

async function createReport(date, content) {
  const isoDate = date.toISOString().split('T')[0]
  const year = isoDate.slice(0, 4)
  const dir = join('./reports', year)

  // create the directory if it does not exist
  await mkdir(dir, { recursive: true })

  try {
    const filePath = join(dir, `${isoDate}.txt`)
    await writeFile(filePath, content)
    console.log(`Report for ${isoDate} has been saved.`)
  } catch (error) {
    console.error(`An error occurred: ${error.message}`)
  }
}
