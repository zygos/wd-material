import { FileProcessor } from './2-emitter';
import {
  type FileStatus,
  getNotificationMessage,
  logFileError,
  logFileStatus,
  notifyUser,
  updateFileProgress,
  updateFileStatus,
} from './shared';

// file processor for user-notified files
const userFileProcessor = new FileProcessor();

userFileProcessor.on('status', (fileId: number, status: FileStatus) => {
  notifyUser(fileId, getNotificationMessage(status));
});

// file processor for database-tracked files
const databaseFileProcessor = new FileProcessor();

databaseFileProcessor
  .on('status', (fileId: number, status: FileStatus) => {
    updateFileStatus(fileId, status);
  })
  .on('progress', (fileId: number, progress: number) => {
    updateFileProgress(fileId, progress);
  });

// file processor for logged files using concise syntax
new FileProcessor().on('status', logFileStatus).on('error', logFileError);
