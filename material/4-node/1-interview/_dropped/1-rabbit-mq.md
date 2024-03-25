## RabbitMQ (1 hour)

Sometimes, we might want to split the work between multiple machines. For example, a company wants to generate and send invoices to its customers in the same hour. Let's say they have too many customers to generate all the invoices on a single machine. You would need to somehow split the work between multiple machines. This is where message brokers come in.

Message brokers allow us to distribute the work between multiple machines, to persist the tasks in case of a failure, and to manage various technical details of the communication, reducing the complexity of our application.

- Watch: [RabbitMQ in 100 Seconds](https://www.youtube.com/watch?v=NQ3fZtyXji0) (5 min)

---

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

---