import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { append, endsWith, filter, map, reduce, test } from 'rambda'
import { intoSequentialPromise, pipeAsync } from './utils.js'
import { processMarkdown } from './processMarkdown.js'

const [, , inputPath] = process.argv

if (!inputPath) {
  console.log('Please provide a folder path')
  process.exit(1)
}

const outputPath = `${inputPath}/dist`

// create output directory if it doesn't exist
await mkdir(outputPath, { recursive: true })

await pipeAsync(
  readdir,
  filter(endsWith('.md')),
  filter(test(/^\d/)),
  // reject(startsWith('_')),
  map(file => async () => {
    const outputFilePath = `${outputPath}/${file}`

    const [content, contentPrevious] = await Promise.all([
      readFile(`${inputPath}/${file}`, 'utf8'),
      readFile(outputFilePath, 'utf8').catch(() => ''),
    ])

    const contentProcessed = await processMarkdown(content)

    if (contentPrevious === contentProcessed) {
      console.log(`Unchanged ${outputFilePath}`)
      return
    }

    console.log(`Writing ${outputFilePath}`)

    await writeFile(outputFilePath, contentProcessed)
  }),
  append(() => console.log('Done!')),
  reduce(intoSequentialPromise, []),
)(inputPath)

// TODO: export quizzes

// TODO: zip projects
