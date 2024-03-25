import { type Document } from './shared';
import { Queue, Worker } from './1-queue';

// As we start our application, we create a new queue and a worker.
const documentQueue = new Queue();
const invoiceWorker = new Worker(documentQueue);

// starts looking for new tasks every second
invoiceWorker.start(1000);

function queueGenerateDocument(document: Document) {
  documentQueue.enqueue(document);
}

// Some time later...
// 3 requests are made at the same time.
// The queue will has to handle them one by one.
queueGenerateDocument({
  id: 1,
  amount: 100,
  date: '2024-01-01',
});

queueGenerateDocument({
  id: 2,
  amount: 200,
  date: '2024-01-02',
});

queueGenerateDocument({
  id: 3,
  amount: 300,
  date: '2024-01-03',
});
