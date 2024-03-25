import { createReadStream, createWriteStream } from 'fs';

// The solution to the first test requires 3 steps, each ~2 - 4 lines of code.

export async function processCsvStreams(
  sourcePath: string,
  destinationPath: string,
) {
  // 1. Create streams.
  // const sourceStream = /* ... */
  // const destinationStream = /* ... */
  //
  // 2. Pipe from source to destination chunk by chunk.
  // Stream pipe method moves data from one stream to another
  // from left-side stream to right-side stream.
  // /* ... */.pipe(/* ... */);
  //
  // 3. How will we know when the process is done?
  // Streams are event emitters:
  // - if the stream ends successfully, it emits a 'finish' event
  // - if the stream encounters an error, it emits an 'error' event
  //
  // Since this is an async operation, we could return a Promise
  // that resolves when the 'finish' event is emitted.
  // If any stream emits an 'error' event, the Promise should reject,
  // which will throw an error.
}
