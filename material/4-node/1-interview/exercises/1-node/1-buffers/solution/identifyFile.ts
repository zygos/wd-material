import * as fs from 'fs';
import { getFileType } from './getFileType';

const SIGNATURE_BYTES = 8;

/**
 * Identify the file type based on the signature (magic number).
 * @param imageFilePath Path to the image file.
 * @returns The file type or null if the file type is not supported.
 */
export async function identifyFile(
  imageFilePath: string
): Promise<string | null> {
  const file = await fs.promises.readFile(imageFilePath);

  // Get the first 8 bytes of the file in the HEX format.
  const signature = file.toString('hex', 0, SIGNATURE_BYTES);

  return getFileType(signature);
}

// Instead of reading the entire file content, we will read only the first 8 bytes.
export async function identifyFileBuffer(
  imageFilePath: string
): Promise<string | null> {
  // Create a buffer of 8 bytes
  const buffer = Buffer.alloc(SIGNATURE_BYTES);

  // Open the file handle.
  const handle = await fs.promises.open(imageFilePath, 'r');

  // Read the first 8 bytes of the file starting from the beginning of the buffer (offset 0).
  // Read 8 bytes starting from the beginning of the file (position 0).
  await handle.read(buffer, 0, SIGNATURE_BYTES, 0);

  // Close the file handle.
  await handle.close();

  // Convert the 8 byte buffer to a string.
  const signature = buffer.toString('hex', 0, SIGNATURE_BYTES);

  return getFileType(signature);
}
