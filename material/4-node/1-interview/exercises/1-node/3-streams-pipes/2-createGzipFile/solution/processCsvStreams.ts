import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

export function processCsvStreams(sourcePath: string, destinationPath: string) {
  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  return pipeline(
    // read file
    sourceStream,

    // compress
    createGzip(),

    // write to destination file
    destinationStream
  );
}
