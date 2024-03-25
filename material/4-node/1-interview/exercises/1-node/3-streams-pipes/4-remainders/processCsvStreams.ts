import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { processRow } from '../shared';

export async function processCsvStreams(
  sourcePath: string,
  destinationPath: string,
) {
  const readStream = createReadStream(sourcePath, {
    // a tiny buffer size to forcefully split a small file into multiple chunks
    highWaterMark: 128,
  });
  const destinationStream = createWriteStream(destinationPath);

  return pipeline(
    readStream,
    new CsvTransform(), // creating a new instance of our transform stream
    createGzip(),
    destinationStream,
  );
}

// This time we will use a class that extends Node's Transform class.
// This allows us to add additional state to our transform stream, such as the remainder
// from the last chunk.
class CsvTransform extends Transform {
  // TODO: add a property to keep track of the remainder from the last chunk

  constructor() {
    super({ decodeStrings: false });
  }

  // TODO: adapt the transform method to handle remainders in between chunks
  _transform(chunk: Buffer, encoding: BufferEncoding, callback: Function) {
    const content = chunk.toString();
    const rows = content.split('\n');
    const rowsProcessed = rows.map(processRow).join('\n');

    this.push(rowsProcessed);

    callback();
  }
}
