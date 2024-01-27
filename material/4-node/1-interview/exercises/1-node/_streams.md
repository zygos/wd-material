import * as fs from 'fs';

const logFilePath = 'path/to/log/file.log';
let lastSize = 0;

fs.watchFile(logFilePath, (curr) => {
  if (curr.size > lastSize) {
    const stream = fs.createReadStream(logFilePath, {
      start: lastSize,
      end: curr.size,
    });

    stream.on('data', (data) => {
      const newLogEntries = data.toString();
      console.log(`New log entries:\n${newLogEntries}`);
    });

    lastSize = curr.size;
  }
});
