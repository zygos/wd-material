import { afterEach, expect, it } from 'vitest';
import { writeFile } from 'fs/promises';
import { processCsv } from './processCsv';
import { join } from 'path';
import { formCsvContent, deleteFiles, readGzipContent } from '../shared';

const sourcePath = join(__dirname, './test.csv');
const destinationPath = join(__dirname, './test.csv.gz');
const { original, expected } = formCsvContent(100);

afterEach(deleteFiles(sourcePath, destinationPath));

it('should compress a CSV file successfully', async () => {
  await writeFile(sourcePath, original);
  await processCsv(sourcePath, destinationPath);

  const content = await readGzipContent(destinationPath);

  expect(content).toBe(expected);
});
