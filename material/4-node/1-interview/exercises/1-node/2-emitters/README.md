# Node.js Event Emitter Example

This example demonstrates the use of Node.js Event Emitters to handle file processing events in a more flexible and extendable manner compared to direct function calls. The example is divided into two parts: a simple direct function call approach and an implementation using Event Emitters.

## Files

- `1-plain.ts`: Demonstrates a straightforward approach to file processing using direct function calls.
- `2-emitter.ts`: Introduces an `EventEmitter` based approach to handle file processing, making the system more flexible and extendable. The FileProcessor no longer needs to know about the specifics of whether it should log updates, make calls to the database, send emails or any other action. It just emits events that are relevant to the file processing, and the listeners can decide what to do with those events. This allows creating a more modular system.
- `2-emitter-usage.ts`: Shows how to use the `FileProcessor` class from `2-emitter.ts` to handle the same file processing scenarios as in `1-plain.ts`.
