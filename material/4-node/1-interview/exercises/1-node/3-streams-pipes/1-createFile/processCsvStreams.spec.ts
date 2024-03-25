import { afterEach, expect, it } from 'vitest';
import { access, writeFile } from 'fs/promises';
import { processCsvStreams } from './processCsvStreams';
import { join } from 'path';
import { deleteFiles, formCsvContent } from '../shared';

const sourcePath = join(__dirname, './test.csv');
const destinationPath = join(__dirname, './test.csv.gz');

const { original } = formCsvContent(1000);

afterEach(deleteFiles(sourcePath, destinationPath));

it('should create a file', async () => {
  await writeFile(sourcePath, original);
  await processCsvStreams(sourcePath, destinationPath);

  // does not throw
  await expect(access(destinationPath)).resolves.toBeUndefined();
});

it('should throw an error if source file does not exist', async () => {
  await expect(
    processCsvStreams('../non-existing-path/test.csv.gz', destinationPath),
  ).rejects.toThrow();
});

it('should throw an error if destination file is not in an existing directory', async () => {
  await expect(
    processCsvStreams(sourcePath, '../non-existing-path/test.csv.gz'),
  ).rejects.toThrow();
});
