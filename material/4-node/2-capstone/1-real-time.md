Part 1: Real-Time Applications with WebSockets

## Sprint Introduction

Get ready to level up your Node.js game and dive into the world of real-time applications! We're kicking off Module 4 with a thrilling sprint focused on WebSockets, natural language processing with chatbots, vector databases, and Agile development.

Here's what you'll learn:

- **WebSockets**. We will explore an alternative to the traditional one-directional request/response cycle using WebSockets. We will build a chat system that allows users to communicate in real time.
- **Streamed Chatbots**. We will revisit LLM-powered chatbots, but this time, we will apply our knowledge of streams to create a more interactive and engaging experience.
- **Vector Databases, Embeddings, and RAG**. We will unlock a new powerful tool for storing and retrieving information using vector databases. Embeddings are a game-changer for recommendation engines, semantic searches, and long-term memory, and providing long-term memory to our LLMs using the Retrieval Augmented Generation (RAG) model.
- **Agile Methodologies**. Finally, we will review the principles and tools behind applying Agile methodologies to our projects. This part will prepare you for your final capstone project and work in a real-world development environment.

**Important.** Remember, these parts build on each other! Go in order, and ensure you've grasped Agile concepts before launching into your capstone project planning.

## Part Introduction

Turing College has tasked you with building a proof-of-concept chat room application to help TC learners. The chat room should support an arbitrary number of learners communicating in real time. In addition, Turing College wants to integrate a chatbot that can be triggered by mentioning its name— Alan. The chatbot can access user messages, various Turing College docs, and resources to answer questions. Finally, TC wants to see bot responses streamed to the client word-by-word, similar to other popular chat applications like ChatGPT or Google Gemini.

In this part, we're building the foundation for our real-time AI-powered chat room. Given the time constraints, the product manager does not expect you to engineer a production-ready chat application. You can cut corners and make assumptions to make the project more manageable, as you need to demonstrate that this idea is technically viable and that you could build upon it in the future.

We will reference some solutions that you can [download here](https://drive.google.com/file/d/1nNnHPElmQ6-EPIOfZqTbwU3qHU2PsmqE/view?usp=drive_link).

Let's get moving!

## WebSockets (30 min)

We will start by building a minimal application that allows multiple users to send messages to each other. How could we implement this using traditional HTTP requests?

One method is simply having a server endpoint, such as `messages`, in which the client `POST` creates a new message and `GET` retrieves all messages. The user could check for any new messages every 5 seconds or so. While this approach is acceptable, it introduces a 5-second delay and requires 12 requests per second. We could make requests frequently, but this could result in 100s of requests per minute, which is inefficient and requires many requests to the database. This is known as **short polling**. It is best suited for infrequent updates.

Alternatively, the client could make a single request, and the server could take its sweet time to respond. It could "hang" the request until there is something new the user needs to know about. For example, a user provides the timestamp of the last message they saw, and the server responds when there are some new messages to be sent. This is known as **long polling**.

```js
// GET /messages

// Assuming we have a req, res objects as in Express
const { since: sinceTimestamp } = req.query

// Every second the server checks for new messages
const interval = setInterval(async () => {
  const messages = await getNewMessagesSince(sinceTimestamp)

  // if we have new messages, respond to the client
  if (messages.length > 0) {
    res.json(messages)
    clearInterval(interval)
  }
}, 1000)
```

Long polling saves us from making many requests, but it still requires us to initiate new requests on the client side to check for new messages. Also, this requires the server to keep checking the database for new messages, which is inefficient. We could circumvent this somewhat by adding an event emitter to database operations with some Pub/Sub system, which then iterates through all connected long-polling clients and resolves their requests with new messages. However, there are better solutions for some applications that require efficient real-time messaging.

Instead of the client poking the server asking for updates, we can establish a two-way connection between the client and server, and then the server can initiate a response to the client whenever there is something new to tell them. This can be achieved with WebSockets.

WebSockets allow for real-time, bidirectional communication between web clients and servers, making it well-suited for applications that require instant updates and interactivity. It is beneficial for chat applications (Facebook Messenger, Instagram DMs), real-time updates (various real-time trading applications), multiplayer games, and more.

- Watch: [Short Polling vs. Long Polling vs. WebSockets](https://www.youtube.com/watch?v=ZBM28ZPlin8) (5 min)
- Watch: [Webhooks vs. WebSockets vs. HTTP Streaming (and Server-Sent Events)](https://www.youtube.com/watch?v=6RvlKYgRFYQ) (15 min)

Pop quiz! Which of the following methods would be best suited for each of the following scenarios?

- Short polling
- Long polling
- Server-Sent Events (SSE)
- WebSockets
- Webhooks

1. Scenario: Your application deals with infrequent updates, such as a weather application that updates every 15 minutes, and keeping the client up-to-date is not critical. Your priority is having a simple, easy-to-implement solution that works on all browsers.

<details>
  <summary>Answer</summary>

  **Short polling** is the most straightforward method to implement and is suitable for infrequent updates.
</details>

2. Scenario: a real-time collaborative tool for building diagrams. You need to keep all users in sync with the latest changes and make it feel as if all users are working on the same document simultaneously.

<details>
  <summary>Answer</summary>

  WebSockets are the most efficient way to keep all users in sync with the latest changes.
</details>

3. Scenario: Your product manager wants to see when a new application deployment passes CI/CD steps without manual checking. Your team already uses Slack for business communication. You are tasked with creating a GitHub—Slack integration that sends a message in the team's Slack channel whenever GitHub Actions deploys a new version of the application.

<details>
  <summary>Answer</summary>

  Webhooks. Once GitHub finishes the deployment job, it can send a POST request to your server, sending a message to the Slack channel.
</details>

4. Scenario: a social media app that requires frequent social feed updates, such as X (Twitter). However, some delay is acceptable, and the client makes relatively infrequent requests to create new posts.

<details>
  <summary>Answer</summary>

  Long polling or Server-Sent Events (SSE) for the feed updates. Regular HTTP requests for sending new messages.
</detail>

## Exercise: Proof-of-concept chat application (1.5 hours)

WebSockets sound like a good start for our chat application. However, we are unsure whether this is the right tech for our project. Instead of committing to a full chat application, we will build a proof-of-concept application to see if WebSockets is the right tech for our project. While you are free to structure your project however you like, for this guided series of exercises, we will use a bare minimum structure:

- No frameworks
- No build tools
- No databases or data persistence (at least for now)
- No user authentication
- No styling
- Minimal to no automated testing
- No CI/CD pipeline

We recommend starting with only two source files:

- `index.html` for the front end
- `server.js` for the back end, though you can use TypeScript if you prefer; we can even use plain JavaScript with some JSDoc types for this proof-of-concept.

You aim to build a page demonstrating how multiple visitors can chat in a single chat room. Any visitor can type in a message and send it to all other visitors on the chat page. You can test this behavior by opening multiple tabs in your browser or using separate browsers. You should be able to send a message in one tab and see it immediately appear in every other tab.

**Note.** WebSockets establish a long-lived connection between the client and server. If the connection is lost at any point, the client cannot send or receive messages. You will need to refresh the page to re-establish the connection. Alternatively, you can implement a reconnection mechanism, a common practice in professional applications.

**Note.** You do not need to preserve data between server restarts or clients refreshing the page and losing their color and username.

Recommended resources:

- Read: ["Simple server" example using Node ws package](https://github.com/websockets/ws?tab=readme-ov-file#simple-server) (5 min)
- Read: [Writing WebSocket client applications](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications) (10 min)

We recommend using the following steps:

1. Create a new directory for the project, for example, "chat".
2. `npm init -y && npm pkg set type="module"` to create a new `package.json` file with `type` set to `module`. This will allow us to use ES6 modules without TypeScript.
3. `npm i ws` to install a simple, low-level WebSockets package.
4. Create a `server.js` file using the "Simple server" ws example. Use some random 4-digit port, for example, `8080`.
5. Run `node server.js` to run the file. You must close the server (`Ctrl/Cmd` + `C`) and start it again if you change something. Alternatively, you can install the `nodemon` package to restart the server.
6. Create a new index.html file that tries to connect to the server using WebSockets through `ws://localhost:8080`. Open this `index.html` file in your browser. You can use the VS Code "Live Server" extension to serve the file or open it as a file in your browser. Here is the minimal client implementation:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Turing Chat</title>
  </head>

  <body>
    <h1>Turing Chat</h1>
  </body>

  <script>
    const ws = new WebSocket('ws://localhost:8080')

    ws.onopen = () => {
      console.log('Hello, browser console!')
    }

    ws.onmessage = (event) => {
      console.log('Server says:', event.data)
    }
  </script>
</html>
```

7. Ensure your server can see the client's messages and vice versa. For a possible solution, you can now check the `1-chat` in the provided code examples.
8. Remove the dummy test messages sent between the client and server. Let's build the actual chat functionality.
9. Implement the following flow:
 - Allow the client to type a message in an `input` or a `textarea` inside a `form`.
 - Once the client submits the form, send it to the server (do not forget to add an `event.preventDefault()` to prevent the form from refreshing the page).
 - The server should then broadcast this message back to the client.
 - Once the client receives the message, it should appended to some chat HTML element.

If this works correctly, you should see the message you sent to appear in the browser tab from which you sent it. Try to open multiple tabs and see if the message appears in all of them. At this point, this should not work yet.

You can check the intermediate solution in the `2-chat` folder.

10. How could you **send the message to all connected clients**? Once you send a message in one tab, it should be immediately visible in all other tabs. You can check the `3-chat` folder for a possible solution.

**Tip.** While there is nothing wrong with using the `console` in this prototyping stage, this approach will become cumbersome sooner or later. If you only need to know what is being sent and received, you can inspect requests on the client side using the browser's developer tools. In your browser's developer tools, you can use the "Network" tab to see the WebSocket connection and the messages sent and received. In browsers, such as Chrome and Firefox, it is categorized as "WS" or "WebSocket".

## Exercise: Multiple clients (1 hour)

While our chat app works on multiple tabs, it does not distinguish between users. We will add a simple feature to assign each user a random username and color. This will allow us to see who is sending each message. In an actual application, we would use authentication to assign the correct user to each connection, but for a PoC project, it is a secondary detail.

**Task.** Implement the following flow:

1. Once a client connects to the server, the client is assigned a random username and color. In an actual application, we would use real Turing College usernames, but now, we can use randomly generated usernames.

- You can generate a random 6-letter string, such as `jandoe` for a random username.
- You do not need to enforce the uniqueness of colors and usernames. It is OK if two clients get the same color or, even in an unlikely event, the same username.
- For easier styling, you can use [HTML color names](https://www.w3schools.com/tags/ref_colornames.asp), such as `Red`, `Aquamarine`, `SlateBlue`, etc.
- Clients should not be able to provide their username or color; the server should assign and fully manage it. The server can use a simple array to keep track of colors and usernames.

2. Once a learner sends a message, it is displayed in the chat with their color in every client's chat. So, if a server assigns a color `Red` to a user `jandoe`, every message from `jandoe` should be displayed in red.

At this point, you should consider:
- sending JSON objects instead of plain text messages. This will allow you to send additional information, such as the color of the message;
- creating an additional JS file in the server if you find your `server.js` file getting too messy or mixing multiple concerns.

You can see a possible solution in the `4-chat` folder.

## Exercise: Adding a chatbot (3 hours)

Now that we have a simple chat application let's add a chatbot to assist learners by answering their questions.

The chatbot will be a server-managed participant in the chat. It will be able to respond to messages from learners as if they were any other chatter. However, we do not want to trigger the chatbot whenever a user sends a message. We only want to trigger the chatbot when a learner directs a message at it, for example, by mentioning its name or starting the message with "Alan."

**Task.** Update your current chat application to fulfill the following requirements:

1. Once a learner sends a message directed at Alan, the chatbot should respond with a message. You could check if that message contains the word "Alan" or try to implement a more sophisticated way to detect if the message is directed at the chatbot.
2. Chatbot has some relevant context in the system prompt/preamble, so it knows its name and goal.
3. The bot should have access to the message history (for example, 10 last messages) to provide relevant responses. You can do this by storing the chat history on the server side and providing it to the bot when it generates a response.
4. The bot's messages should be distinguishable from user messages in the front end. You can add a different background color, border, or anything else to clarify that the message is from the bot.

You can build this feature with any LLM model you like. Here are a few options:

- Free, though throttled and slightly slow to respond - [Cohere](https://cohere.com). [Cohere API npm package](https://www.npmjs.com/package/cohere-ai). For Cohere, you can use the [chat](https://docs.cohere.com/reference/chat) or [generate](https://docs.cohere.com/reference/generate) endpoints.
- Paid, but offers $5 credit after verifying a phone number, which should be enough for this project - [Anthropic](https://www.anthropic.com/) (uses Claude). [Anthropic API npm package](https://www.npmjs.com/package/@anthropic-ai/sdk). You can use the [messages](https://docs.anthropic.com/claude/reference/messages_post) or [text completion](https://docs.anthropic.com/claude/reference/complete_post) endpoints.
- Paid - [OpenAI](https://platform.openai.com). [OpenAI API npm package](https://www.npmjs.com/package/openai). For OpenAI GPT models, you can use the [Chat Completions API](https://platform.openai.com/docs/guides/text-generation/chat-completions-api?lang=node.js).

Chatbot services are quickly evolving, so the links or terms provided may not be up to date. If so, please let us know about that on the Turing College Discord channel!

We recommend practicing some OOP (or functional) patterns that would allow you to easily switch between the two models if you decide to do so. The ability to change a particular service provider is a good practice, and it leads to more flexible and reusable code. The method you choose does not need to be perfect, but you should try to make it at least a bit flexible so you would not need to rewrite the entire bot logic if you switch to a different service provider.

**Hint.** Not all APIs support multiple chat participants. You might need to do some "hacky" workarounds to make this work.

**Solution.** Once you complete this step and can converse with multiple users and the chatbot, you can check the `5-chat` folder for a possible solution.

## Exercise: Streaming LLM chatbot responses (2 hours)

While our bot can respond to messages, we must wait for the chatbot service to generate the entire response before sending it back to the client. This is not ideal, as the response can take a few seconds to generate. Luckily for us, most LLM models support streaming responses in small chunks.

So, instead of waiting for the entire chatbot response, we will send the response to the client word by word (or, more precisely, token by token). This will allow the client to display the response as it is being generated, providing a more interactive and engaging experience.

OpenAI, Anthropic, and Cohere all support streaming responses. You can check the respective API documentation and their npm packages for more information on how to achieve this.

**Task.** Update your chatbot to stream its responses to the client. The client should display the response as it is being generated. You can assume that the chunks will be streamed in order. You can skip handling tricky cases, such as handling timeouts. This would be necessary in an actual application, but it is optional for this proof-of-concept.

**Solution.** You can review the solution in the `6-chat` folder.

In the next part, we will enhance this chatbot with more features.

# Directions for further research (2 hours+)

- How could you use WebSockets with an Express application?
- What is Socket.io, and how does it compare to using the `ws` package?
- We have not touched upon one similar technology, Server-Sent Events (SSE). How does it compare to WebSockets?
- What are some limitations or drawbacks of using WebSockets? What would happen if you wanted to use WebSockets with lots of Node instances?
- Would you consider WebSockets as stateful or stateless communication? Why?
