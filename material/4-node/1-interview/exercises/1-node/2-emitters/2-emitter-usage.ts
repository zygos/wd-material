import { FileProcessor } from './2-emitter'
import { type FileStatus, getNotificationMessage, logFileError, logFileStatus, notifyUser, updateFileProgress, updateFileStatus } from './functions'

// file processor for user-notified files
const userFileProcessor = new FileProcessor()

userFileProcessor.on('status', (fileId: number, status: FileStatus) => {
  notifyUser(fileId, getNotificationMessage(status))
})

// file processor for database-tracked files
const databaseFileProcessor = new FileProcessor()

databaseFileProcessor.on('status', (fileId: number, status: FileStatus) => {
  updateFileStatus(fileId, status)
})

databaseFileProcessor.on('progress', (fileId: number, progress: number) => {
  updateFileProgress(fileId, progress)
})

// file processor for logged files
const loggedFileProcessor = new FileProcessor()

// we could even skip wrapping the functions, though this can hide type errors
loggedFileProcessor.on('status', logFileStatus)
loggedFileProcessor.on('error', logFileError)
