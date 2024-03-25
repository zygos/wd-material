import { afterEach, expect, it } from 'vitest';
import { writeFile } from 'fs/promises';
import { processCsvStreams } from './processCsvStreams';
import { join } from 'path';
import { deleteFiles, formCsvContent, readGzipContent } from '../shared';

const sourcePath = join(__dirname, './test.csv');
const destinationPath = join(__dirname, './test.csv.gz');

const { original, expected } = formCsvContent(10);

afterEach(deleteFiles(sourcePath, destinationPath));

it('should transform a small CSV file successfully', async () => {
  await writeFile(sourcePath, original);
  await processCsvStreams(sourcePath, destinationPath);

  const content = await readGzipContent(destinationPath);

  expect(content).toMatchObject(expected);
});
