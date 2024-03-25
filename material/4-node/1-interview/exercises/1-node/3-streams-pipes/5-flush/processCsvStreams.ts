import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { processRow } from '../shared';

export async function processCsvStreams(
  sourcePath: string,
  destinationPath: string,
) {
  const readStream = createReadStream(sourcePath);
  const destinationStream = createWriteStream(destinationPath);

  return pipeline(
    readStream,
    new CsvTransform(),
    createGzip(),
    destinationStream,
  );
}

// TODO: handle additional cases of an empty file and the trailing line
// that doesn't end with a newline character. You might need to look up
// the "_flush" method of the Transform class.
class CsvTransform extends Transform {
  private remainder = '';

  constructor() {
    super({ decodeStrings: false });
  }

  _transform(chunk: Buffer, encoding: BufferEncoding, callback: Function) {
    // Prepend the remainder from the last chunk to the current chunk
    const content = this.remainder + chunk.toString();
    const rows = content.split('\n');

    // Keep the last line as it may be incomplete
    this.remainder = rows.pop() || '';

    const rowsProcessed = rows.map(processRow).join('\n');

    this.push(rowsProcessed + '\n');

    callback();
  }
}
