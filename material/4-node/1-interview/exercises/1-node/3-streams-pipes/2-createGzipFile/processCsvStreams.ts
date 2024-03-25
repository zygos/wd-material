import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createGzip } from 'zlib';

export function processCsvStreams(sourcePath: string, destinationPath: string) {
  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  // You want to end up with the following pipeline:
  // 1. Read from file chunk by chunk.
  // 2. Compress.
  // 3. Write to destination file.

  // Add another step in our transformation pipeline.
  // Instead of using gzip function from 'zlib', we can use
  // createGzip function to create a Gzip transform stream.
  // This stream will compress the data that passes through it.

  return pipeline(
    // read file
    sourceStream,

    // write to destination file
    destinationStream
  );
}
