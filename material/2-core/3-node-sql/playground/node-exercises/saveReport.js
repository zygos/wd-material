import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'

const FORCE_FLAG = '--force'

const args = process.argv.slice(2)
const content = args.find(arg => !arg.startsWith('--'))
const doForce = args.includes(FORCE_FLAG)

await createReport(content, doForce)

async function createReport(content, doForce = false) {
  const isoDate = new Date().toISOString().split('T')[0]
  const year = isoDate.slice(0, 4)
  const dir = join('./reports', year)

  await mkdir(dir, { recursive: true })

  try {
    const filePath = join(dir, `${isoDate}.txt`)
    const flags = doForce ? 'w' : 'wx'
    await writeFile(filePath, content, { encoding: 'utf-8', flag: flags })
    console.log(`Report for ${isoDate} has been saved.`)
  } catch (error) {
    if (error.code === 'EEXIST') {
      console.error(`Report for ${isoDate} already exists. Use --force to overwrite.`)
    } else {
      console.error(`An error occurred: ${error.message}`)
    }
  }
}
