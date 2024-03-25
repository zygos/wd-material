import { afterEach, expect, it } from 'vitest';
import { writeFile } from 'fs/promises';
import { processCsvStreams } from './processCsvStreams';
import { join } from 'path';
import { deleteFiles, formCsvContent, readGzipContent } from '../shared';

const sourcePath = join(__dirname, './test.csv');
const destinationPath = join(__dirname, './test.csv.gz');
const { original, expected } = formCsvContent(1000); // a slightly larger file

afterEach(deleteFiles(sourcePath, destinationPath));

it('should compress a CSV file successfully', async () => {
  await writeFile(sourcePath, original);
  await processCsvStreams(sourcePath, destinationPath);

  const content = await readGzipContent(destinationPath);
  const lines = content.split('\n');
  const linesExpected = expected.split('\n');

  expect(lines.length).toBe(linesExpected.length);
  expect(content).toBe(expected);
});

it('handles empty CSV files', async () => {
  await writeFile(sourcePath, '');
  await processCsvStreams(sourcePath, destinationPath);

  const content = await readGzipContent(destinationPath);

  expect(content).toBe('');
});

it('handles CSV files without trailing new line', async () => {
  await writeFile(sourcePath, original.slice(0, -1));
  await processCsvStreams(sourcePath, destinationPath);

  const content = await readGzipContent(destinationPath);
  const lines = content.split('\n');
  const linesExpected = expected.slice(0, -1).split('\n');

  expect(lines.length).toBe(linesExpected.length);
  expect(content).toBe(expected.slice(0, -1));
});
