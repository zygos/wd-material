/**
 * Map the signature to the file type.
 * @param signature The file signature in HEX format (lowercase).
 * @returns The file type or null if the file type is not supported.
 * @example getFileType('ffd8ffe0') // 'image/jpeg'
 * @see https://en.wikipedia.org/wiki/List_of_file_signatures
 */
export function getFileType(signature: string): string | null {
  // alternatively, we could directly compare the signature
  // to a buffer instead of converting it to a string
  // 8 bytes = 16 HEX characters (012...9abcdef)
  if (signature === '6674797069736f6d') {
    return 'image/mp4';
  }

  // shorter signatures
  // 4 bytes = 8 HEX characters
  const signature4 = signature.slice(0, 8);

  if (
    signature4 === 'ffd8ffe0' ||
    signature4 === 'ffd8ffe1' ||
    signature4 === 'ffd8ffe2'
  ) {
    return 'image/jpeg';
  } else if (signature4 === '89504e47') {
    return 'image/png';
  }

  // unknown file type
  return null;
}
