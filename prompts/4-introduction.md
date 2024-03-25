Here is the current sprint part I am working on:

"""
Sprint 1: Intermediate Node.js concepts
Part 1: Buffers, Streams and Queues

# Part introduction

{{
  TODO: add intro on how we will go through some underlying mechanisms of Node.js and dealing with data processing that were not covered in API development.
}}

# Key learning topics & resources for this part

## Buffers (1.5 hours)

**Problem.** Your manager reports that the there was a bug in image upload logic that caused the files to be stored without the correct file extension, so now it is unclear which images are MP4s, JPEGs, PDFs, etc. You need to find a way to identify the file type of each file.

Luckily, most non-plain-text files have a header that contains the file signature, which can be used to identify the file type. For example, JPEG images start with the the binary signature `111111111101100011111111` (`FF D8 FF` in hex).

Another developer on your team has already written a function that reads the file and checks the first few bytes to determine the file type. However, once this was deployed to production, you noticed that the script could not keep up with the number and size of files being uploaded, sometimes causing request timeouts and even **server crashes during peak hours** 😓

The **product manager has asked you to fix the issue ASAP**, so you need to find a way to process the files more efficiently.

The current solution uses the Node's `fs.readFile` function, which **reads the entire file into memory**. You realize that this might be the reason for the performance issues, as the files are being read into memory all at once, causing the server to run out of available memory or take too long to process the files.

You ask yourself whether there is any better way of reading the file than the `fs.readFile` method you're currently using. You look up that Node.js buffers that allows to deal with binary data, so you decide to give it a try.

- Watch: [Node.js Buffers](https://www.youtube.com/watch?v=4YRUyrbusvM) (5 min)
- Read: [Node.js Buffers guide](https://blog.logrocket.com/node-js-buffer-complete-guide/) (25 min)
- Documentation: [Node.js Buffers Documentation](https://nodejs.org/api/buffer.html) (as needed)
- Exercise: `1-buffers` exercise (1 hour)

{{ MUST: add a link to exercises }}

## Event Handling and Event Emitters (1.5 hours)

- Read: [The Node.js Event emitter](https://nodejs.org/en/learn/asynchronous-work/the-nodejs-event-emitter) (15 min)
- Read: [Node Event Emitters](https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2) (20 min)
- Watch: [Events Module](https://www.youtube.com/watch?v=Su0-Y9coU3s) and [Extending from EventEmitter](https://www.youtube.com/watch?v=UK2uQjgsoI4) (20 min)
- Example: `2-emitters` (30 min)

{{ MUST: add a link to example }}

Event emitters shift the responsibility of handling events from the caller to the callee. This allows us to write more modular code and separate the concerns of file upload and processing logic. It is great for creating generic modules for asynchronous operations where there is a lot of flexiblity in how the operation should be handled but there is a common fixed order of operations.

**Problem**: Your application processes various types of files. Some files and their processing progress should be tracked in the database, some files should send a notification to the user when they are processed, and some files should only be logged. Also, you think this complexity might increase in the future and you might need to add more types of file processing logic, such as calling an external API or sending an email.

**Example.** Open up the `1-node/2-emitters` folder and review the 2 examples of writing these file processors. The first method relies on bundling our entire file processing logic into a single function for each type of file processor. The second method uses event emitters to emit generic events at different stages of the file processing.

The second method allows us to write more modular code and separate the concerns of file upload and processing logic.

While event emitters and handlers are a powerful tool for processing asynchronous operations, they should be used sparingly. Good use cases for event emitters are:

{{ MUST: review the 3 use cases below }}
- **Long-running operations:** When you have a long-running operation that needs to be broken down into smaller steps, event emitters can be used to emit events at each step.
- **Publish/Subscribe:** When you need to notify multiple "subscribers" (e.g. user A, user B, user C) of an event (e.g. new message, new order, etc.), event emitters can be used to emit events to all subscribers.
- **Generic modules.** When you need to create a generic module that can be used in different contexts, event emitters can be used to allow the caller to define the some behavior of the module.

## Streams and Pipes (2.5 hours)

- Watch: [Readable Streams](https://www.youtube.com/watch?v=E3tTzx0Qoj0) (10 min)
- Watch: [Writable Streams](https://www.youtube.com/watch?v=DvlCT0N7yQI) (5 min)
- Watch: [Pipes](https://www.youtube.com/watch?v=a8W90jDHSho) (10 min)
- Exercises: `3-streams-pipes` (2 hours)

{{ MUST: add a link to exercises }}

**When Not to Use Streams or Pipes?**

While streams and pipes are powerful for handling large amounts of data, they might not be the best choice when:

1. **Processing Small Files:** For small files, the overhead of setting up streams might not be worth the benefits. Loading the entire content into memory is simpler and faster.
2. **Simple REST API Calls:** When making simple API calls that return small JSON payloads, using buffers or streams is unnecessary. It’s more straightforward to use higher-level HTTP client libraries that handle the response as a whole.
3. **Synchronous Operations:** If you need to perform operations in a synchronous manner or need the entire data set to perform an operation, streams can complicate the process. In such cases, it's better to use methods that wait for the full data to be available.

### Queues (1.5 hours)

**Problem:** As your application grows and the number of users increases, so does the load on your server. During peak times, your server struggles to process the high volume of requests, leading to slow response times and even downtime. You need a way to handle this increased load without compromising on performance.

**Solution:** Enter message queues - a way to manage workload distribution across multiple workers or services. Think of a message queue like a to-do list for your application. Tasks that need to be done are added to the queue, and various workers or services take tasks from the queue to process them. This way, you can scale your processing power horizontally by adding more workers, and your main application thread remains responsive to user requests.

- Watch: [What is a Message Queue?](https://www.youtube.com/watch?v=xErwDaOc-Gs) (20 min)
- Exercise: `4-queues` in `1-node` exercises (1 hour)

{{ MUST: add a link to exercises }}

**When Not to Use Message Queues?**

While message queues are a powerful tool for scalability and reliability, they are not always the right solution:

{{ MUST: review the points below: }}
1. **Simple Tasks:** For simple tasks that can be processed quickly and do not require scalability, the overhead of maintaining a queue might not be justified.
2. **Real-time Processing:** If your application requires immediate processing of tasks (e.g., real-time chat), introducing a queue might introduce unwanted delays.
3. **Transactional Consistency:** If your tasks need to be processed in a strict order or require transactional consistency, a message queue might complicate the architecture. You may need to look into other patterns, like distributed transactions or sagas.

# Directions for further research (2 hour+)

- While queues have their use cases in single-server applications, they are especially useful in distributed systems. How are queues used in distributed systems?
- One of the most popular queue systems is RabbitMQ. When should you consider migrating your application towards something like RabbitMQ in a project?
- Most queues deal with FIFO (first in, first out) processing. Could you think of a use case where you would need a different processing order, such as LIFO (last in, first out) or priority-based processing?

## Optional: How V8 and Node Work Under the Hood (3 hours)

- Watch: [Understanding the V8 JavaScript Engine](https://www.youtube.com/watch?v=xckH5s3UuX4) (10 min)
- Watch: [JavaScript Under The Hood](https://www.youtube.com/playlist?list=PLillGF-Rfqbars4vKNtpcWVDUpVOVTlgB) (2 hours)

V8 is the JavaScript engine that powers Node.js, and it's a masterful piece of engineering that turns your JavaScript code into something the computer can execute lightning fast. Node.js, on the other hand, provides the environment for your JavaScript to interact with the operating system, file system, network, and more. We have ignored the inner workings of these tools so far, but now it's time to take a peek under the hood.

**JIT Compilation**

- Watch: [V8 JIT Compilation](https://www.youtube.com/watch?v=p-iiEDtpy6I) (30 min)

**Note on compilers.** Nowadays, latest V8 engine versions use even [three](https://v8.dev/blog/sparkplug) or even [four](https://v8.dev/blog/maglev) compilers to optimize JavaScript code.
"""

Write an introduction for this part of the sprint.

Here are some introduction examples from other parts in no particular order:

"""
Part 1: Packages and Build Tools

# Sprint Description

Congratulations on successfully completing your first few interactive web pages! By this point, you should have a basic understanding of HTML, CSS, and JavaScript - the meat and potatoes of web development. However, the previous sprint may have left you with several unanswered questions, such as:

- How should I organize my files?
- How should I structure my code within those files?
- Do professional developers write their code the same way, using raw HTML, CSS, and JS files?
- Should I use functions, classes, or something else?
- I've come across some libraries that don't provide a URL which I can use to include them in a script tag. How can I use them?
- I've heard about frameworks like React, Vue, and Angular. What are they and how do they work?
- Is there any way to spot potential errors in my code before I run it?
- My code looks like a bowl of spaghetti. How can I make it more readable?

In this sprint, we will will not be learning any new programming languages so we can focus on tackling these questions and some more. We will learn how to use what we already know in a more professional manner. Along the way, we will also continue to refine our skills in HTML, CSS, and JavaScript.
"""

"""
Part 1: PostgreSQL and TypeORM

# Part introduction

In this sprint, we will start working on applications with a front end and a back end.

Here is the sprint structure modeled after the general structure of a full-stack application:

![Full stack application](https://imgur.com/3OtDjnK.png)

In this part, we are leveling up our database! We are moving from SQLite and Kysely to PostgreSQL and TypeORM - a significant leap forward in terms of the robustness and complexity of our tech stack. Now, this may feel daunting, but fear not. Remember, this is just an introduction. The goal is not to master or feel completely comfortable with these new tools. We do not expect you to become a PostgreSQL or TypeORM wizard overnight or even in a month. We want you to get a sense of how to use these tools even with limited knowledge, understand the general ideas behind them, and reach a basic level of proficiency where you can get something productive done.

Why are we making this move? SQLite is an excellent tool for learning SQL and works well for many embedded environments like browsers, mobile phones, and desktop applications. But, it has some limitations that make it less suitable for web-scale applications. Conversely, PostgreSQL is a more full-featured database that can handle high concurrency, large amounts of data and better database management tools. It also supports more advanced features and offers greater control over data management and access permissions.

Then there is TypeORM. Until now, we've been dealing with SQL operations directly with Kysely. TypeORM, on the other hand, is an Object-Relational Mapping (ORM) library that provides a higher level of abstraction for dealing with the database. It manages our database relations via objects, reducing the need to write boilerplate code for migrations and repositories. Again, this is a more complex tool with its trade-offs, but it can lead to more maintainable codebase.

Let's get started!
"""

"""
Part 1: REST APIs and Express.js

# Part introduction

During this sprint, we'll work on three projects:
- Parts 1 - 2: Guided hands-on exercises on creating a minimal REST CRUD API with Express.js.
- Parts 3: A guided hands-on exercise on writing testable code and using TDD
- Part 4: A peer programming exercise to create a movie ticket booking Express.j API in a test-driven manner.
- Part 5: A Discord bot with a REST API for congratulating Turing College students on their progress.

Part 3 will feature some additional exercises for refactoring and testing your code.

Parts 1 - 3 will have many code snippets, and we will provide most solutions to check against at the end of each part. We will ramp up the difficulty of some exercises to ensure that you are still challenged since you can step through the provided solutions if you get stuck.

By the end of this sprint, expect to be able to:

- create a small REST API with Express.js with controllers and models
- use TypeScript with Express.js
- use a query builder to query the database
- write a simple validation schema using `zod`
- use Test-Driven Development (TDD) and Dependency Injection (DI) to test small modules in isolation
- write integration tests for testing Express.js controllers
- use a TDD development cycle live in a pair programming session and during a correction session

You will NOT be expected to be able to:

- to be able to write integration and unit tests with DI without seeing examples
- come up with a solution matching the provided solutions in every regard
- setup a project with migrations and DI on your own
- use DI for testing every layer of a back-end application

In the first part, we will create a few endpoints for a REST API with Express.js.

We will work on creating a simple CRUD API that will allow us to save and read articles and comments. It will have the following table structure:

```sql
Table article {
  id integer [primary key]
  title text [not null]
  content text [not null]
}

Table comment {
  id integer [primary key]
  content text [not null]
  article_id integer [not null]
  user_id integer [not null]
  created_at timestamp [not null]
}

Table user {
  id integer [primary key]
  first_name text [not null]
  last_name text [not null]
}
```

Articles have zero-to-many comments; each comment has an author (user), and users can have many comments. In reality, the schema would involve more moving parts and relations, but we will keep it simple for your first back-end project.

We will slowly reveal the requirements for this API and some initial steps on how to implement them. You will be expected to figure out the rest on your own.
```

Articles have zero-to-many comments; each comment has an author (user), and users can have many comments. In reality, the schema would involve more moving parts and relations, but we will keep it simple for your first back-end project.

We will slowly reveal the requirements for this API and some initial steps on how to implement them. You will be expected to figure out the rest on your own.
"""

"""
Part 2: Deploying Containers with Cloud Services

# Part introduction

In this part of the module, we aim to equip you with the knowledge and skills to deploy your web application to a cloud service. We will use Amazon Web Services (AWS), one of the most popular cloud platforms, to host and manage our application.

**Goals:**

- Understand the concept of managed infrastructure and how it benefits web development.
- Familiarize yourself with AWS and its key services.
- Learn to set up an AWS account and navigate its user interface.
- Gain hands-on experience in deploying a web application to AWS using Lightsail.
- Understand the process of setting up a Continuous Integration/Continuous Deployment (CI/CD) pipeline.
- Learn to automate the deployment process using GitHub Actions.
- Apply the learned concepts and skills to deploy your capstone project.

**Limitations:**

- While exploring AWS in this part, we will not cover other cloud platforms like Google Cloud Platform or Microsoft Azure. However, the principles you learn here can also be applied to these platforms.
- We will use AWS Lightsail, a beginner-friendly service, for deployment. AWS offers other more complex services for container orchestration, like Elastic Kubernetes Service (EKS) and Elastic Container Service (ECS), which we will not cover.
- We will not delve deep into configuring custom servers. We will focus on using managed services that balance ease of management and professional workflow.
- We will not cover advanced topics like Infrastructure as Code (IaC), advanced deployment strategies, and cost management on AWS in detail. These are important topics for a professional web developer who wants to specialize in DevOps, and we encourage you to explore them on your own.

While we will guide you through the process, setting up a CI/CD pipeline requires careful attention to detail and a willingness to troubleshoot and solve problems as they arise. While we will guide you through the process, you must be able to troubleshoot and fill in some gaps yourself.
"""

I need an introduction for Sprint 1 (Intermediate Node.js concepts) Part 1 (Buffers, Streams and Queues). It should include an introduction to the entire sprint and then a more detailed introduction to this part of the sprint.

The sprint consists of:

- Part 1: Buffers, Streams and Queues
- Part 2: Intermediate TypeScript
- Part 3: OOP and FP patterns
- Part 4: NoSQL Databases and MongoDB
- Part 5: Mock Technical Interview

Part 5 introduction for reference:

"""
Welcome to the final part of this sprint, where you will undergo the most comprehensive test of your skills yet: a mock technical interview. This interview is designed to simulate the experience of a real technical interview for a junior back-end web developer position, covering a wide range of topics from Node.js and TypeScript to databases and Express.js, as well as OOP, FP, data structures, algorithms, and basic system design.
"""

Write an introduction for Part 1: Buffers, Streams and Queues.
