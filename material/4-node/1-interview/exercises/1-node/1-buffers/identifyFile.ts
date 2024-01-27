import * as fs from 'fs'

const SIGNATURE_BYTES = 8

/**
 * Identify the file type based on the signature (magic number).
 * @param imageFilePath Path to the image file.
 * @returns The file type or null if the file type is not supported.
 */
export async function identifyFile(imageFilePath: string): Promise<string | null> {
  const file = await fs.promises.readFile(imageFilePath)

  // Get the first 8 bytes of the file in the HEX format.
  const signature = file.toString('hex', 0, SIGNATURE_BYTES)

  return getFileType(signature)
}

function getFileType(signature: string): string | null {
  // 8 bytes = 16 HEX characters
  if (signature === '6674797069736f6d') {
    return 'image/mp4'
  }

  // shorter signatures
  // 4 bytes = 8 HEX characters
  const signature4 = signature.slice(0, 8)

  if (
    signature4 === 'ffd8ffe0' ||
    signature4 === 'ffd8ffe1' ||
    signature4 === 'ffd8ffe2'
  ) {
    return 'image/jpeg'
  } else if (signature4 === '89504e47') {
    return 'image/png'
  }

  // unknown file type
  return null
}

// MUST: move to solution
// Instead of reading the entire file content, we will read only the first 8 bytes.
export async function identifyFileBuffer(imageFilePath: string): Promise<string | null> {
  // Create a buffer of 8 bytes
  const buffer = Buffer.alloc(SIGNATURE_BYTES)

  // Open the file handle.
  const handle = await fs.promises.open(imageFilePath, 'r')

  // Read the first 8 bytes of the file starting from the beginning of the buffer (offset 0).
  // Read 8 bytes starting from the beginning of the file (position 0).
  await handle.read(buffer, 0, SIGNATURE_BYTES, 0)

  // Close the file handle.
  await handle.close()

  // Convert the 8 byte buffer to a string.
  const signature = buffer.toString('hex', 0, SIGNATURE_BYTES)

  return getFileType(signature)
}

export function identifyFileBufferCallbacks(imageFilePath: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    fs.open(imageFilePath, 'r', (err, fd) => {
      if (err) return reject(err)

      const buffer = Buffer.alloc(SIGNATURE_BYTES)

      fs.read(fd, buffer, 0, SIGNATURE_BYTES, 0, (err, bytesRead, buffer) => {
        if (err) return reject(err)

        fs.close(fd, (err) => {
          if (err) return reject(err)

          const signature = buffer.toString('hex', 0, SIGNATURE_BYTES)

          resolve(getFileType(signature))
        })
      })
    })
  })
}
