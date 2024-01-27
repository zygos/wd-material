import { afterAll, beforeAll } from 'vitest'
import { saveFile } from './saveFile'
import { rm } from 'fs/promises'
import { join } from 'path'

export function setupFiles(dirname: string, sizeMegaBytes: number) {
  const jpgPath = join(dirname, 'fake-jpg')
  const mp4Path = join(dirname, 'fake-mp4')

  const sizeBytes = sizeMegaBytes * 1024 * 1024

  beforeAll(async () => {
    await Promise.all([
      saveFile('ffd8ffe0', jpgPath, sizeBytes),
      // saveFile(0xffd8ffe0, pngPath, sizeBytes),
      saveFile('6674797069736f6d', mp4Path, sizeBytes),
    ])
  })

  afterAll(async () => {
    await Promise.all([
      rm(jpgPath),
      rm(mp4Path),
    ])
  })

  return {
    mp4Path,
    jpgPath,
  }
}
