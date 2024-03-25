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
    // read file
    readStream,

    // our new custom Transform stream!
    csvTransform,

    // compress
    createGzip(),

    // write to destination file
    destinationStream,
  );
}

// Creating a Transform stream to process the CSV data using a custom function.
// We could create it as a class that extends Transform class or by directly
// creating a new instance of Transform class with our transformation logic passed
// as a parameter.
// We will use the second approach for this exercise.
const csvTransform = new Transform({
  decodeStrings: false,
  transform(chunk: Buffer, encoding: BufferEncoding, callback: Function) {
    try {
      // TODO: implement the transformation logic
      // 1. Convert Buffer to String.
      // 2. Process each row, similarly as in 0-withoutStreams example.

      // 3. Push the processed string chunk.
      // Transform Stream has a `push` method to send data to the next stream.
      // this.push(...);

      // Call the callback function to signal that the transformation is done.
      // This is similar to next() function in Express.js. This used to be the
      // main way of dealing with async tasks before Promises were added
      // to JS.
      callback();
    } catch (error) {
      // If an error occurs, call the callback function with the error.
      callback(error);
    }
  },
});
