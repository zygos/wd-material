import { afterEach, expect, it } from 'vitest';
import { readFile, writeFile } from 'fs/promises';
import { processCsvStreams } from './processCsvStreams';
import { join } from 'path';
import { deleteFiles, formCsvContent } from '../shared';

const sourcePath = join(__dirname, './test.csv');
const destinationPath = join(__dirname, './test.csv.gz');

const { original } = formCsvContent(1000);

afterEach(deleteFiles(sourcePath, destinationPath));

it('should create a gzip file', async () => {
  await writeFile(sourcePath, original);
  await processCsvStreams(sourcePath, destinationPath);

  const content = await readFile(destinationPath);
  const isGzip = content[0] === 0x1f && content[1] === 0x8b;
  expect(isGzip).toBeTruthy();
});
