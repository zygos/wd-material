Modules you might use once in a while:
- `child_process` for running external processes.
- `stream` for parsing, transforming, and combining data in chunks.
- `crypto` for encryption, pseudo-random numbers, hashing, etc.
- `timers/promises` for Promise-based `setTimeout`, so you can `await setTimeout(1000)`.

Modules you will use very rarely but are good to know about:
- `os` - operating system information, though you should rarely need this.
- `http`, `http2`, `https` - usually abstracted away by frameworks.
- `events` - for creating `EventEmitter`, though most of the time you will use already existing event emitters.

QA:
- What is the purpose of nginx and Apache?
- What is considered "serverless"?