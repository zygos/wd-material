import { createWriteStream } from 'fs';

// Function to generate a massive fake JPEG image
export function saveFile(
  hexSignature: string,
  filename: string,
  sizeBytes: number
): Promise<void> {
  const stream = createWriteStream(filename);

  // Write the header
  const header = formSignatureHeader(hexSignature);
  stream.write(header);

  // Calculate the number of bytes to write for the specified size
  const remainingSize = sizeBytes - header.length;

  // Fill with 0s
  const zeros = Buffer.alloc(remainingSize);
  stream.write(zeros);

  // Close the stream
  stream.end();

  // ensure the file exists before returning
  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      resolve(undefined);
    });
    stream.on('error', (err) => {
      reject(err);
    });
  });
}

function formSignatureHeader(hexSignature: string): Buffer {
  return Buffer.from(hexSignature, 'hex');
}
