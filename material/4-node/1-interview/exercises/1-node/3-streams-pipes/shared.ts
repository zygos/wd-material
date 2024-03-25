import { readFile, unlink } from 'fs/promises';
import { gunzip } from 'zlib';
import { promisify } from 'util';

const gunzipAsync = promisify(gunzip);

export const readGzipContent = async (filePath: string) => {
  const compressed = await readFile(filePath);

  return (await gunzipAsync(compressed)).toString();
};

export const formCsvContent = (lineCount: number) => {
  const original = 'item,100\n'.repeat(lineCount);
  const expected = 'ITEM,100.00,120.00\n'.repeat(lineCount);

  return { original, expected };
};

export const processRow = (row: string) => {
  if (!row) return row; // empty row

  // take in a comma-separated row with 2 columns
  const [item, price] = row.split(',');

  // add 20% tax, in practice this would be a bit more complex
  const itemUpperCase = item.toUpperCase();
  const priceFloat = parseFloat(price);
  const priceFixed = priceFloat.toFixed(2);
  const taxed = (priceFloat * 1.2).toFixed(2);

  // output a comma-separated row with 3 columns
  return `${itemUpperCase},${priceFixed},${taxed}`;
};

/**
 * Deletes files if they exist.
 */
export const deleteFiles = (() => {
  // an example of wrapping in a closure for clearer separation of
  // which functions are nested and not exported
  const unlinkIfExists = async (path: string) => {
    try {
      return await unlink(path);
    } catch (error) {
      if (isFileNotFoundError(error)) return;

      throw error;
    }
  };

  const isFileNotFoundError = (error: unknown): boolean =>
    error instanceof Error && 'code' in error && error.code === 'ENOENT';

  return (...paths: string[]) =>
    async () => {
      await Promise.all(paths.map(unlinkIfExists));
    };
})();
