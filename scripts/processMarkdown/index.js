const { append, endsWith, filter, map, reduce, reject, startsWith } = require('rambda')
const { intoSequentialPromise, pipeAsync } = require('./utils')
const { readdir, readFile, writeFile } = require('fs/promises')
const { mkdirSync } = require('fs')
const processMarkdown = require('./processMarkdown')

const [, , inputPath] = process.argv

if (!inputPath) {
  console.log('Please provide a folder path')
  process.exit(1)
}

const outputPath = `${inputPath}/dist`

// create output directory if it doesn't exist
mkdirSync(outputPath, { recursive: true })

pipeAsync(
  readdir,
  filter(endsWith('.md')),
  reject(startsWith('_')),
  map(file => async () => {
    const content = await readFile(`${inputPath}/${file}`, 'utf8')
    const processedContent = await processMarkdown(content)
    const outputFilePath = `${outputPath}/${file}`

    console.log(`Writing ${outputFilePath}`)

    await writeFile(outputFilePath, processedContent)
  }),
  append(() => console.log('Done!')),
  reduce(intoSequentialPromise, []),
)(inputPath)
