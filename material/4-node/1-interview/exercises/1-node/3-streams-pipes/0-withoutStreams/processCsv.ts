import { readFile, writeFile } from 'fs/promises';
import { gzip } from 'zlib';
import { promisify } from 'util';
import { processRow } from '../shared';

const gzipAsync = promisify(gzip);

/**
 * Processes a CSV file by reading it, processing each row, and writing the result to a
 * gzipped CSV file. For simplicity, we are ignoring the header row as it is would only
 * distract from the main point of the example and provided exercises.
 * @param sourcePath CSV file path
 * @param destinationPath Gzipped CSV file path
 */
export async function processCsv(
  sourcePath: string,
  destinationPath: string,
): Promise<void> {
  const content = await readFile(sourcePath, 'utf8');

  const rows = content.split('\n');
  const rowsProcessed = rows.map(processRow);
  const csv = rowsProcessed.join('\n');

  // compress the content
  const compressed = await gzipAsync(csv);

  await writeFile(destinationPath, compressed);
}
