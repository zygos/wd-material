import { bench } from 'vitest'
import { identifyFile, identifyFileBuffer, identifyFileBufferCallbacks } from '../identifyFile'
import { setupFiles } from './setup'

// to see an even bigger difference, increase the file size to 1000 MB
const { mp4Path } = setupFiles(__dirname, 100)

bench('reading the entire file', async () => {
  await identifyFile(mp4Path)
})

// this should be 200 - 600x times faster!
bench('reading with buffers', async () => {
  await identifyFileBuffer(mp4Path)
})

bench('reading with buffers and callbacks', async () => {
  await identifyFileBufferCallbacks(mp4Path)
})
