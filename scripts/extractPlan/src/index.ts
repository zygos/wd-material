import { anyPass, evolve, includes, join, map, pipe, reject, startsWith } from 'rambda'
import { join as joinPaths } from 'node:path'
import extractChapters from './extractChapters'
import { readFile, readdir, writeFile } from 'node:fs/promises'

const [, , path] = process.argv

if (!path) {
  console.error('Please provide path to the module folder')
  process.exit(1)
}

const filePaths = (await Promise
  .all((await readdir(path))
    .filter(name => !name.includes('.') && !name.startsWith('_'))
    .map(sprintFolder => joinPaths(path, sprintFolder))
    .map(async (sprintPath) => {
      const parts = await readdir(sprintPath)

      return parts
        .filter(part => part.endsWith('.md'))
        .filter(part => !part.startsWith('_'))
        .map(part => joinPaths(sprintPath, part))
    })))
    .flat()

const files = await Promise
  .all(filePaths
    .map(async (filePath) => {
      const content = await readFile(filePath, 'utf-8')

      return {
        fileName: (filePath.split('/').pop() || '').split('.').shift() || '',
        content,
      }
    }))

const chapters = map(evolve({
  content: pipe(
    extractChapters,
    reject(anyPass([
      includes('Sample questions for'),
      startsWith('**Step '),
      startsWith('**Note'),
      startsWith('**Notes'),
      startsWith('**Tip'),
      startsWith('**Pro tip'),
      includes('Estimate average time to'),
    ])),
    join('\n'),
  ),
}))(files)

const output = chapters
  .map(({ fileName, content }) => `${fileName}:\n${content}\n\n`)

const outputPath = joinPaths(path, 'structure.md')

await writeFile(outputPath, output, 'utf-8')

console.log('Done!')
