Part 1: Buffers, Streams and Queues

# Part introduction

Welcome to the Node.js specialization! 🚀 If you've been cruising through REST endpoints and feeling pretty confident about your Node.js journey, this sprint will take you a step deeper into some of the key concepts that power Node.js.

Throughout this sprint, we'll tackle:

- **Part 1: Buffers, Streams, and Queues** - where we tackle the efficient handling of data.
- **Part 2: Intermediate TypeScript** - going beyond the basics with various utility types and type generics.
- **Part 3: OOP and FP Patterns** - exploring different programming paradigms and their applications.
- **Part 4: NoSQL Databases and MongoDB** - adding one more database to your toolbelt.
- **Part 5: Mock Technical Interview** - test your skills in a simulated interview setting.

In this part of our sprint, we're diving deep into the heart of Node.js to explore Buffers, Streams, and Queues. These concepts are the unsung heroes of efficient data handling and processing, crucial for developing high-performance applications.

**Goals:**

- Learn how to work with binary data directly, an essential skill for tasks like processing uploaded files or interacting with certain network protocols.
- Discover the power of streams for handling large volumes of data without overwhelming your server's memory. Streams are your best friend for tasks like reading large files or processing data on the fly.
- Get to grips with message queues for managing tasks and workload distribution. This is key for building scalable applications that can handle high loads gracefully.

**Limitations:**

- While we'll cover these concepts in depth, remember that mastering them takes practice. Don't worry if you don't get everything right away! 🤔
- This part is more about understanding the "why" and "how" rather than memorizing code.

# Key learning topics & resources for this part

## Buffers (2 hours)

**Problem.** Your team lead informs you about a bug in image upload logic that caused 1000s of files to be stored without the correct file extension, so now it is unclear which images are JPEGs, PNGs, etc. You need to find a way to identify the file type of each file without the file extension.

Luckily, most non-plain-text files have a header that contains [the file signature](https://en.wikipedia.org/wiki/List_of_file_signatures), which can be used to identify the file type. For example, JPEG images start with the binary signature `111111111101100011111111` (`FF D8 FF` in hex).

Another developer on your team has already written a function that reads the file and checks the first few bytes to determine the file type. However, once this was deployed to production, the script could not keep up with the number and size of files, causing request timeouts and even **server crashes** 😓

The **team lead has asked you to fix the issue ASAP**.

The current solution uses the Node's `fs.readFile` function, which **reads the entire file into memory**. You realize that this might be the reason for the performance issues, as the files are being read into memory all at once, causing the server to run out of available memory or take too long to process the files. You wonder is there a way to read only the first few bytes of the file.

- Watch: [Node.js Buffers](https://www.youtube.com/watch?v=4YRUyrbusvM) (5 min)
- Read: [Node.js Buffers guide](https://blog.logrocket.com/node-js-buffer-complete-guide/) (25 min)
- Documentation: [Node.js Buffers Documentation](https://nodejs.org/api/buffer.html) (as needed)
- Exercise: `1-buffers` exercise in [part exercises](https://drive.google.com/file/d/1xoFQ13KkiBYsY0iwElnZhFxzkPxRggcV/view?usp=sharing) (1.5 hours)

## Event Handling and Event Emitters (1.5 hours)

- Read: [The Node.js Event emitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter) (15 min)
- Read: [Node Event Emitters](https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2) (20 min)
- Watch: [Events Module](https://www.youtube.com/watch?v=Su0-Y9coU3s) and [Extending from EventEmitter](https://www.youtube.com/watch?v=UK2uQjgsoI4) (20 min)
- Example: `2-emitters` (30 min)

Event emitters are great for creating generic modules for asynchronous operations where there is a lot of flexibility in how the operation should be handled, yet there is a common fixed order of operations.

Under the hood, Node.js uses event emitters all over the place. Many of its core modules, such as HTTP, file system, and streams, use event emitters to handle asynchronous operations. Some global objects, such as `process`, are also event emitters (e.g., `process.on('exit', (code) => { ... })`).

**Problem**: Your application processes various types of files. Some files and their processing progress should be tracked in the database, some files should notify the user when they are processed, and some files should only be logged. Also, you expect this complexity to increase in the future, and you might need to add more types of file-processing logic, such as calling an external API or sending an email.

**Example.** Open up the `1-node/2-emitters` folder and review the 2 examples of writing these file processors. The first method relies on bundling our entire file-processing logic into a single function for each type of file processor. The second method uses event emitters to emit generic events at different file-processing stages.

The second method allows us to write more modular code and separate the concerns of file upload and processing logic.

When should you use event emitters?

- **Asynchronous Operations:** Event emitters are ideal for handling asynchronous operations where you need to perform actions in response to certain events happening in the system, such as finishing reading a file or receiving a network request.
- **Decoupling Components:** They help decouple components in your application. By emitting events, different parts of your application can listen and react to these events without having to be tightly integrated.
- **Implementing Observer Pattern:** Event emitters are a great way to implement the observer pattern, where an object (subject) maintains a list of its dependents (observers) and notifies them automatically of any state changes.

However, event emitters are not always the best choice:

- **Simple Synchronous Operations:** If you have a simple synchronous operation, using event emitters might introduce unnecessary complexity. It's better to use simple function calls.
- **Direct Communication:** If your components need to communicate back and forth to function correctly, introducing event emitters could complicate the architecture without significant benefits.
- **Addional Complexity:** If you don't need to listen to events from multiple sources, using event emitters might introduce unnecessary complexity, additional TypeScript types and even potential memory leaks if not handled correctly.

## Streams and Pipes (2.5 hours)

- Watch: [Readable Streams](https://www.youtube.com/watch?v=E3tTzx0Qoj0) (10 min)
- Watch: [Writable Streams](https://www.youtube.com/watch?v=DvlCT0N7yQI) (5 min)
- Watch: [Pipes](https://www.youtube.com/watch?v=a8W90jDHSho) (10 min)
- Exercises: `3-streams-pipes` (2 hours)

**When should you not use streams or pipes?**

While streams and pipes are powerful for handling large amounts of data, they might not be the best choice when:

1. **Processing Small Files:** The overhead of setting up streams might not be worth the benefits for small files. Loading the entire content into memory is more straightforward and faster.
2. **Simple REST API Calls:** Explicitly dealing with buffers and streams is unnecessary when making simple API calls that return small JSON payloads. It’s more straightforward to use higher-level HTTP client libraries that handle the response as a whole.
3. **Synchronous Operations:** Streams can complicate the process if you need to perform operations synchronously or need the entire data set to operate. In such cases, it's better to use methods that wait for the full data to be available.

### Queues (1.5 hours)

**Problem:** As your application grows and the number of users increases, so does the load on your server. During peak times, your server struggles to process the high volume of requests, leading to slow response times and even downtime. You need a way to handle this increased load without compromising on performance.

**Solution:** Enter queues - a way to manage workload distribution across multiple workers or services. Think of a queue as a to-do list for your application. Tasks that need to be done are added to the queue, and various workers or services take tasks from the queue to process them. This way, you can scale your processing power horizontally by adding more workers, and your main application thread remains responsive to user requests.

- Watch: [What is a Message Queue?](https://www.youtube.com/watch?v=xErwDaOc-Gs) (20 min)
- Exercise: `4-queues` in `1-node` exercises (1 hour)

**When Not to Use Message Queues?**

While message queues are a powerful tool for scalability and reliability, they are not always the right solution:

- **In Simple Applications:** Implementing message queues might introduce unnecessary complexity for simple applications with low traffic and minimal background processing requirements.
- **Immediate Response Requirement:** If your application requires immediate processing and response, introducing a message queue might introduce unnecessary latency. Direct processing without queuing might be more appropriate.
- **When Direct Communication is Needed:** If your components must communicate back and forth to function correctly, introducing a message queue could complicate the architecture without significant benefits.

# Directions for further research (1 hour+)

- While queues have their use cases in single-server applications, they are instrumental in distributed systems. How are queues used in distributed systems?
- One of the most popular queue systems is RabbitMQ. When should you consider migrating your application towards something like RabbitMQ in a project?
- Most queues deal with FIFO (first in, first out) processing. Could you think of a use case where you would need a different processing order, such as LIFO (last in, first out) or priority-based processing?

## Optional: How V8 and Node Work Under the Hood (3 hours)

- Watch: [Understanding the V8 JavaScript Engine](https://www.youtube.com/watch?v=xckH5s3UuX4) (10 min)
- Watch: [JavaScript Under The Hood](https://www.youtube.com/playlist?list=PLillGF-Rfqbars4vKNtpcWVDUpVOVTlgB) (2 hours)

V8 is the JavaScript engine that powers Node.js, and it's a masterful piece of engineering that turns your JavaScript code into something the computer can execute lightning fast. Node, on the other hand, provides the environment for your JavaScript to interact with the operating system, file system, network, and more. We have ignored the inner workings of these tools so far, but now it's time to take a peek under the hood.

**JIT Compilation**

- Watch: [V8 JIT Compilation](https://www.youtube.com/watch?v=p-iiEDtpy6I) (30 min)

**Note on compilers.** Nowadays, latest V8 engine versions use even [three](https://v8.dev/blog/sparkplug) or even [four](https://v8.dev/blog/maglev) compilers to optimize JavaScript code.
