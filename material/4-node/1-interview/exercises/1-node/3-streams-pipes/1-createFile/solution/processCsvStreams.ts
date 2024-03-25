import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

export function processCsvStreams(sourcePath: string, destinationPath: string) {
  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  sourceStream.pipe(destinationStream);

  return new Promise((resolve, reject) => {
    sourceStream.on('error', reject);
    destinationStream.on('error', reject);
    destinationStream.on('finish', resolve);
  });
}

// A more concise solution which combines the stream creation, piping, errors and Promise
// handling into a single function.
// We will continue to build on top of this solution in the next exercises, however,
// it is important to see what this utility function does behind the scenes and how
// Streams can be dealt with as any other Event Emitter.
export function processCsvStreamsPipeline(
  sourcePath: string,
  destinationPath: string,
) {
  const sourceStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  return pipeline(sourceStream, destinationStream);
}
