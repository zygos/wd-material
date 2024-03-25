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

export async function identifyFileBuffer(
  imageFilePath: string
): Promise<string | null> {
  // TODO: Implement this function.
  // Create a buffer

  // Fill the buffer with the first 8 bytes of the file.

  // Convert the 8 byte buffer to a HEX string and call getFileType.
  return null;
}
