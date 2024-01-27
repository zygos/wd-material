import { describe, expect, it } from 'vitest'
import { identifyFile, identifyFileBuffer, identifyFileBufferCallbacks } from '../identifyFile'
import { setupFiles } from './setup'

const { jpgPath, mp4Path } = setupFiles(__dirname, 0.1)

const functions = [
  identifyFile,
  identifyFileBuffer,
  identifyFileBufferCallbacks,
]

describe.each(functions)('%o', (identify) => {
  it('identifies a JPEG file', async () => {
    const type = await identify(jpgPath)

    expect(type).toBe('image/jpeg')
  })

  it('identifies a MP4 file', async () => {
    const type = await identify(mp4Path)

    expect(type).toBe('image/mp4')
  })

  it('returns null for unknown files', async () => {
    const type = await identify(__filename)

    expect(type).toBeNull()
  })
})
