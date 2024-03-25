import {
  getNotificationMessage,
  lengthyProcess1,
  lengthyProcess2,
  lengthyProcess3,
  logFileError,
  logFileStatus,
  notifyUser,
  updateFileProgress,
  updateFileStatus,
} from './shared';

// While it is straightforward to understand and step through the code, the
// simple approach of just calling functions directly makes it hard to extend
// the code down the line. Also, if we want to add more functionality, we have
// to modify multiple places in the code.
export async function processUserFile(fileId: number, data: string) {
  try {
    await notifyUser(fileId, getNotificationMessage('processing'));

    await lengthyProcess1(data);
    await lengthyProcess2(data);
    await lengthyProcess3(data);

    await notifyUser(fileId, getNotificationMessage('done'));
  } catch (error) {
    await notifyUser(fileId, getNotificationMessage('error'));
    throw error;
  }
}

export async function processDatabaseFile(fileId: number, data: string) {
  try {
    await updateFileStatus(fileId, 'processing');
    await updateFileProgress(fileId, 0);

    await lengthyProcess1(data);
    await updateFileProgress(fileId, 30);

    await lengthyProcess2(data);
    await updateFileProgress(fileId, 60);

    await lengthyProcess3(data);
    await updateFileProgress(fileId, 100);

    await updateFileStatus(fileId, 'done');
  } catch (error) {
    await updateFileStatus(fileId, 'error');
    throw error;
  }
}

export async function processLoggedFile(fileId: number, data: string) {
  try {
    logFileStatus(fileId, 'processing');

    await lengthyProcess1(data);
    await lengthyProcess2(data);
    await lengthyProcess3(data);

    logFileStatus(fileId, 'done');
  } catch (error) {
    logFileError(fileId, error);
  }
}
