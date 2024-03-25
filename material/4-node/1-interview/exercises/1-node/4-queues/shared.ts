import { setTimeout } from 'timers/promises';

export type Document = {
  id: number;
  amount: number;
  date: string;
};

let isProcessing = false;

export async function generateDocument(document: Document) {
  // Simulates a scenario when you can not process more than one item at a time.
  if (isProcessing) {
    throw new Error('Application crashed! Too many requests.');
  }

  isProcessing = true;
  await setTimeout(1000);
  isProcessing = false;
  console.log(`Document ${document.id} has been generated!`);
}
