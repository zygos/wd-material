import { generateDocument, type Document } from '../shared';

export class Queue {
  private items: Document[] = [];

  enqueue(item: Document): void {
    console.log('Enqueueing item:', item);
    this.items.push(item);
  }

  dequeue(): Document | undefined {
    // Remove and return the first item in the queue.
    // This is called a FIFO (First In First Out) data structure,
    // where the first item added is the first to be removed.
    return this.items.shift();
  }
}

export class Worker {
  private isProcessing = false;

  constructor(private queue: Queue) {}

  private async process(): Promise<void> {
    if (this.isProcessing) return;

    const item = this.queue.dequeue();

    if (!item) return;

    try {
      this.isProcessing = true;
      console.log('Processing item:', item);
      await generateDocument(item);
      console.log('Item processed:', item);
    } catch (error) {
      console.error('Error processing item:', error, item);
    } finally {
      this.isProcessing = false;
    }
  }

  public start(): void {
    // Check for new tasks every second.
    setInterval(() => {
      this.process();
    }, 1000);
  }
}
