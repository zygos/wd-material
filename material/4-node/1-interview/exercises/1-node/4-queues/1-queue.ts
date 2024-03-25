import { generateDocument, type Document } from './shared';

export class Queue {
  enqueue(item: Document): void {
    // TODO: Add an item to some array. You might need to add
    //       a new property to the Queue class to store the items.
  }

  dequeue(): Document | undefined {
    // TODO: Implement. Return the first item in the queue and remove it
    //       from the queue. If the queue is empty, return undefined.
  }
}

export class Worker {
  constructor(private queue: Queue) {}

  private async process(): Promise<void> {
    // TODO: Do not process if the worker is already processing an item.
    //       You will need to add a new property to the Worker class to
    //       keep track of this.
    // TODO: Get the next item from the queue (this.queue.dequeue()).
    //
    // TODO: If there is an item, generate the document:
    // await generateDocument(item);
  }

  public start(intervalMs: number): void {
    // Check for new tasks regularly.
    setInterval(() => {
      this.process();
    }, intervalMs);
  }
}
