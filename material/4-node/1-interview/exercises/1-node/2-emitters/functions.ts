import { setTimeout } from 'timers/promises'

export type FileStatus = 'processing' | 'done' | 'error'

// This is just pseudo-code, you don't need to implement it.

export async function updateFileStatus(fileId: number, status: FileStatus) {
  // ...
}

export async function updateFileProgress(fileId: number, progress: number) {
  // ...
}

export function logFileStatus(fileId: number, status: FileStatus) {
  // ...
}

export function logFileError(fileId: number, error: unknown) {
  if (!(error instanceof Error)) {
    // ...
  }

  // ...
}

export async function notifyUser(fileId: number, message: string) {
  // ...
}

export function getNotificationMessage(status: FileStatus) {
  // ...
  return 'Some message'
}

export const lengthyProcess1 = (data: string) => setTimeout(1000)
export const lengthyProcess2 = (data: string) => setTimeout(1000)
export const lengthyProcess3 = (data: string) => setTimeout(1000)
