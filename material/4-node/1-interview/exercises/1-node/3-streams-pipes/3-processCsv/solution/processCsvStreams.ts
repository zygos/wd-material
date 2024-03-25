import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { processRow } from '../../shared';

export async function processCsvStreams(
  sourcePath: string,
  destinationPath: string,
) {
  const readStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  return pipeline(
    // read file
    readStream,

    // transform CSV data
    csvTransform,

    // compress
    createGzip(),

    // write to destination file
    destinationStream,
  );
}

const csvTransform = new Transform({
  decodeStrings: false,
  transform(chunk: Buffer, encoding: BufferEncoding, callback: Function) {
    try {
      // 1. Convert Buffer to String.
      const content = chunk.toString();

      // 2. Process each row, similarly as in 0-withoutStreams folder.
      const rows = content.split('\n');
      const rowsProcessed = rows.map(processRow);
      const csvString = rowsProcessed.join('\n');

      // 3. Push the processed string chunk.
      this.push(csvString);

      // Call the callback function to signal that the transformation is done.
      callback();
    } catch (error) {
      // If an error occurs, call the callback function with the error.
      callback(error);
    }
  },
});
