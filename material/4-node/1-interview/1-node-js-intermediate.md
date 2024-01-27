Sprint 1 Part 1: Buffers, Streams and Queues

# Part introduction

{{ TODO: add intro }}

# Key learning topics & resources for this part

## Buffers (1.5 hours)

**Problem**: Your manager reports that the there was a bug in image upload logic that caused the files to be stored without the correct file extension, so now it is unclear which images are MP4s, JPEGs, PDFs, etc. You need to find a way to identify the file type of each file.

Luckily, most non-plain-text files have a header that contains the file signature, which can be used to identify the file type. For example, JPEG images start with the the binary signature `111111111101100011111111` (`FF D8 FF` in hex).

Another developer on your team has already written a function that reads the file and checks the first 3 bytes to determine the file type. However, once this was deployed to production, you noticed that the script could not keep up with the number and size of files being uploaded, sometimes causing request timeouts and even server crashes during peak hours 😓

The product manager has asked you to fix the issue ASAP, so you need to find a way to process the files more efficiently.

You ask yourself whether there is any better way of reading the file than the `fs.readFile` method you're currently using. You remember that Node.js has a `Buffer` class that can be used to read and write binary data, so you decide to give it a try.

- Watch: [Node.js Buffers](https://www.youtube.com/watch?v=4YRUyrbusvM) (5 min)
- Read: [Node.js Buffers guide](https://blog.logrocket.com/node-js-buffer-complete-guide/) (25 min)
- Documentation: [Node.js Buffers Documentation](https://nodejs.org/api/buffer.html)
- Exercise: `1-buffers` in `1-node` exercises (1 hour)

{{ MUST: exercise to use buffers to read files }}

## Event Handling and Event Emitters (2 hours)

- Read: [The Node.js Event emitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter) (15 min)
- Read: [Node Event Emitters](https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2) (20 min)
- Watch: [Events Module](https://www.youtube.com/watch?v=Su0-Y9coU3s) and [Extending from EventEmitter](https://www.youtube.com/watch?v=UK2uQjgsoI4) (20 min)

Event emitters shift the responsibility of handling events from the caller to the callee. This allows us to write more modular code and separate the concerns of file upload and processing logic. It is great for creating generic modules for asynchronous operations where there is a lot of flexiblity in how the operation should be handled but there is a common fixed order of operations.

**Problem**: Your application processes various types of files. Some files and their processing progress should be tracked in the database, some files should send a notification to the user when they are processed, and some files should only be logged. Also, you think this complexity might increase in the future and you might need to add more types of file processing logic, such as calling an external API or sending an email.

- **Example.** Open up the `1-node/2-emitters` folder and review the 2 examples of writing these file processors. The first method relies on bundling our entire file processing logic into a single function for each type of file processor. The second method uses event emitters to emit generic events at different stages of the file processing.

The second method allows us to write more modular code and separate the concerns of file upload and processing logic.

While event emitters and handlers are a powerful tool for processing asynchronous operations, they should be used sparingly. Good use cases for event emitters are:

{{ MUST: review the 3 use cases below }}
- **Long-running operations:** When you have a long-running operation that needs to be broken down into smaller steps, event emitters can be used to emit events at each step.
- **Publish/Subscribe:** When you need to notify multiple "subscribers" (e.g. user A, user B, user C) of an event (e.g. new message, new order, etc.), event emitters can be used to emit events to all subscribers.
- **Generic modules.** When you need to create a generic module that can be used in different contexts, event emitters can be used to allow the caller to define the some behavior of the module.

## Streams and Pipes (1.5 hours)

- Watch: [Readable Streams](https://www.youtube.com/watch?v=E3tTzx0Qoj0) (10 min)
- Watch: [Writable Streams](https://www.youtube.com/watch?v=DvlCT0N7yQI) (5 min)
- Watch: [Pipes](https://www.youtube.com/watch?v=a8W90jDHSho) (10 min)
- Exercise: `2-streams` in `1-node` exercises (1 hour)

**Problem:** Your application needs to process data in real-time, such as log files that are continuously updated. Loading the entire log file is inefficient.

Using buffers in conjunction with streams, you can watch for changes in the log file and process the new data as it comes in.

Quite likely, you have already used streams and event emitters in Node.js without even realizing it. For example, the `express` uses Node.js `http` module under the hood, which uses streams to handle incoming requests and send responses. Up until this point we have been handling these operations as all-or-nothing, but now we will learn how to handle them in a more efficient manner.

**Note.** For vast majority of use cases, you will not need to use streams directly. Most of the time, you will be using higher-level abstractions that use streams under the hood. However, sometimes, you will need to interact with them or with APIs that use them directly.

{{ MUST: exercise of either large file uploads OR Real-time Data Processing }}

**When Not to Use Streams or Pipes?**

While streams and pipes are powerful for handling large amounts of data, they might not be the best choice when:

1. **Processing Small Files:** For small files, the overhead of setting up streams might not be worth the benefits. Loading the entire content into memory is simpler and faster.
2. **Simple REST API Calls:** When making simple API calls that return small JSON payloads, using buffers or streams is unnecessary. It’s more straightforward to use higher-level HTTP client libraries that handle the response as a whole.
3. **Synchronous Operations:** If you need to perform operations in a synchronous manner or need the entire data set to perform an operation, streams can complicate the process. In such cases, it's better to use methods that wait for the full data to be available.

### Scalable Messaging with Queues (1 hour)

**Problem:** As your application grows and the number of users increases, so does the load on your server. During peak times, your server struggles to process the high volume of requests, leading to slow response times and even downtime. You need a way to handle this increased load without compromising on performance.

**Solution:** Enter message queues—a way to manage workload distribution across multiple workers or services. Think of a message queue like a to-do list for your application. Tasks that need to be done are added to the queue, and various workers or services take tasks from the queue to process them. This way, you can scale your processing power horizontally by adding more workers, and your main application thread remains responsive to user requests.

- Watch: [What is a Message Queue?](https://www.youtube.com/watch?v=xErwDaOc-Gs) (20 min)

**Example:** Imagine a busy coffee shop during the morning rush. Baristas can only make so many coffees at a time. If every customer had to wait for their coffee to be made before the next order could be taken, the line would be out the door and service would grind to a halt. Instead, orders are taken and placed in a queue, and each barista picks up the next order from the queue as soon as they're ready. This keeps the line moving and customers happy.

In the context of your application, imagine you have a service that generates PDF reports for users. Instead of generating the report as soon as the user requests it, which could take a significant amount of time and resources, you add the request to a queue. A separate worker process then picks up the task from the queue and generates the report, allowing the main application to remain responsive.

- **Exercise:** `3-queues` in `1-node` exercises (30 minutes)

{{ MUST: exercise - implement a simple Queue }}

**RabbitMQ**

Sometimes, we might want to split the work between multiple machines. For example, a company wants to generate and send invoices to its customers in the same hour. Let's say they have too many customers to generate all the invoices on a single machine. You would need to somehow split the work between multiple machines. This is where message brokers come in.

Message brokers allow us to distribute the work between multiple machines, to persist the tasks in case of a failure, and to manage various technical details of the communication, reducing the complexity of our application.

- Watch: [RabbitMQ in 100 Seconds](https://www.youtube.com/watch?v=NQ3fZtyXji0) (5 min)

{{ MUST: exercise to implement PDF creation using a message queue with a Docker launched RabbitMQ instance }}
{{ MUST: galima į capstone parekomenduoti }}

**When Not to Use Message Queues?**

While message queues are a powerful tool for scalability and reliability, they are not always the right solution:

1. **Simple Tasks:** For simple tasks that can be processed quickly and do not require scalability, the overhead of maintaining a queue might not be justified.
2. **Real-time Processing:** If your application requires immediate processing of tasks (e.g., real-time chat), introducing a queue might introduce unwanted delays.
3. **Transactional Consistency:** If your tasks need to be processed in a strict order or require transactional consistency, a message queue might complicate the architecture. You may need to look into other patterns, like distributed transactions or sagas.

#### Debugging (1 hour)

Understanding how to effectively debug your Node.js application is crucial. It helps you save time and reduces frustration by allowing you to pinpoint issues quickly and accurately. Here's a brief intro to some techniques:

- **Console Debugging:** The simplest form of debugging, it involves sprinkling `console.log`, `console.error`, and `console.warn` statements throughout your code to output values to the terminal. It's quick and dirty way that can become unwieldy with complex applications. It also requires cleaning up your console statements {{ MUST: do not upload code with console statements!!! This looks extremely poor in a professional project! It's an immediate rejection. }}.
- **Using Debugger Keyword:** Node.js supports the `debugger` keyword, which acts as a breakpoint when running your app with the `inspect` flag. This is a step up from `console.log` and allows you to pause execution and inspect variables.
- **Node Inspector:** This built-in debugger lets you inspect your code using a user-friendly interface similar to browser dev tools. You can set breakpoints, step through code, and inspect variables and call stacks.
- **Integration with Development Environments:** Tools like Visual Studio Code or WebStorm have built-in debuggers that integrate with Node.js, providing a powerful interface to manage breakpoints, watch expressions, and navigate the call stack.

When setting up your debugger, you'll come across two primary modes: launch and attach.

- **Launch:** This mode starts the Node.js process directly from the debugger, allowing you to control the runtime from the very beginning.
- **Attach:** In attach mode, you connect the debugger to an already running Node.js process.

**Debugging in VS Code**

- Watch: [Node.js Debugging in VS Code](https://www.youtube.com/watch?v=2oFKNL7vYV8) (15 min)

{{ MUST: add a debugging exercise }}

# Directions for further research (1 hour+)

- FIFO vs LIFO implemantion of a queue
- {{ MUST: add more }}

## Optional: How V8 and Node Work Under the Hood (3 hours)

- Watch: [Understanding the V8 JavaScript Engine](https://www.youtube.com/watch?v=xckH5s3UuX4) (10 min)
- Watch: [JavaScript Under The Hood](https://www.youtube.com/playlist?list=PLillGF-Rfqbars4vKNtpcWVDUpVOVTlgB) (2 hours)

V8 is the JavaScript engine that powers Node.js, and it's a masterful piece of engineering that turns your JavaScript code into something the computer can execute lightning fast. Node.js, on the other hand, provides the environment for your JavaScript to interact with the operating system, file system, network, and more. We have ignored the inner workings of these tools so far, but now it's time to take a peek under the hood.

**JIT Compilation**

- Watch: [V8 JIT Compilation](https://www.youtube.com/watch?v=p-iiEDtpy6I) (30 min)

**Note on compilers.** Nowadays, latest V8 engine versions use even [three](https://v8.dev/blog/sparkplug) or even [four](https://v8.dev/blog/maglev) compilers to optimize JavaScript code.

{{ MUST: consider a profiling exercise }}
