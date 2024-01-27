Part 5: Discord bot with a REST API

By now, you must be familiar with the Turing College Discord server. And if you've been participating actively, you'd have noticed the "accomplishments" channel where learners get a shout-out whenever they complete a sprint. Isn't it great to get recognized for your hard work? But have you ever wondered who's behind those cheerful messages?

Well, it's time to pull the curtain and reveal the wizard behind the magic! And not just that, you will be creating your own version of that wizard.

## Project Description

Your task is to design and implement a REST API wrapping a database and a Discord bot that sends a celebratory message whenever a user completes a sprint.

You can assume that your Node.js server will receive a request from another server whenever a user completes a sprint. The server will then send a congratulatory message to the user on Discord on a specific server and channel.

## Project requirements

Here, we will refer to all animated images as GIFs, even though they might be in a different format.

**The bot will need to**:

- be triggered by a request
- fetch a random GIF related to a celebration or success from an external GIF service (such as Giphy or Tenor API)
- retrieve a random congratulatory message template from the database
- retrieve a sprint title from the database
- congratulate a user on a configured Discord server with the GIF and a message in a similar manner to what you can see in the Turing College "accomplishments" channel
- store the congratulatory message and valuable metadata in the database so that it can be retrieved later
- on failure, inform the user that the congratulatory message could not be formed/sent/stored

**REST API will need to support the following endpoints**:

- POST /messages - send a congratulatory message to a user on Discord
- GET /messages - get a list of all congratulatory messages
- GET /messages?username=johdoe - get a list of all congratulatory messages for a specific user
- GET /messages?sprint=WD-1.1 - get a list of all congratulatory messages for a specific sprint
- CRUD /templates - POST/GET/PATCH/DELETE endpoints for managing congratulatory message templates
- CRUD /sprints - POST/GET/PATCH/DELETE endpoints for managing sprints

You may create additional database tables that are not exposed via the REST API.

The bot will receive a JSON payload to the POST `/messages` endpoint:

```json
{
  // unique TC username present in learner's Discord server profile
  "username": "johdoe",

  // unique sprint code: Course-Module.Sprint
  "sprintCode": "WD-1.1"
}
```

You can specify a slightly different format for the input data if it unlocks additional functionality.

This is a good time to introduce a service layer to some of your application modules.

You can assume that the application will serve as an internal Turing College tool on a local network. Another TC server will invoke it to congratulate learners on their progress and by TC staff to manage and view the data. You do not need to implement any authentication or authorization.

**Additional comments:**

- Use Express.js, SQLite, Kysely, zod, Vitest (or jest), ESLint + Prettier, and TypeScript.
- Use migrations for database schema changes. You can also use migrations for seeding the database with some data.
- Use tests to drive your development where possible. Shoot for 90%+ test coverage.
- Do not disclose or commit `.env` and SQLite database file. Provide an `.env.example` file instead that can contain dummy values.
- Provide a `README.md` file with instructions on running your application and interacting with it. If your application makes any assumptions to work properly, such as channel names, document them in the `README.md` file.
- Use dependency injection and mocking to test various side-effects and random behavior, external API calls, and database interactions.

You can use any other packages you deem necessary, such as the `discord.js` package on npm. You are encouraged to use code examples provided to you in the course material as your starting point or as a reference.

This project focuses as much on the end product as on the practice of **writing testable applications and testing them**.

Throughout the project, you might find that some modules are tricky to test. How should you communicate between different data sources? How should you test them? We do not expect that you will be able to arrive at all the right decisions on your first try. However, we expect you to notice issues with a chosen method and, if necessary, adapt your code to mitigate some detected issues while understanding possible trade-offs. Architectural decisions do not necessarily eliminate problems but allow you to choose which problems you want to deal with.

To try out your project in the wild, you must create your own Discord server and configure your server profile to have a username in an expected pattern.

## Additional comments

- Use Express.js, SQLite, Kysely, zod, Vitest (or jest), ESLint + Prettier, and TypeScript.
- Use test-driven development and dependency injection to simplify testing.
- Focus on getting the essential MVP (minimum viable product) working first with 1 - 3 tests per module or endpoint. Once the MVP works, you can add more tests to cover sad paths, edge cases, improper inputs, etc. It is much better to have a good test coverage with a few key tests for every core module than to have 50 test cases checking a single module for slightly different inputs while missing out on other application parts.
- Refactor your code as necessary to mitigate any issues you encounter.

## Bonus challenges (optional)

- Configure the bot to post the congratulatory message in a specific channel based on the completed sprint.
- Allow the user to specify which congratulatory message template. You can assume that the user will provide a template ID.
- Allow the congratulation message template to support any order of user name, sprint title, and congratulation message.
- Send a direct message to the person on the server to congratulate them.
- Configure your bot to serve multiple Discord servers.
- What would happen if your bot failed to send a congratulatory message? How would you handle this situation?

## Starting resources

Right now, we are recommending to use [discord.js](https://www.npmjs.com/package/discord.js) package over directly interacting with `@discordjs/core`/`@discordjs/ws`, as these packages are less documented and have fewer examples.

- [Quick setup, using v14](https://www.youtube.com/watch?v=pDQAn18-2go)
- [Documentation (v14)](https://old.discordjs.dev/#/docs/discord.js/main/general/welcome)
- [Giphy API](https://developers.giphy.com/docs/api/endpoint)
- [Giphy API (npm)](https://www.npmjs.com/package/@giphy/js-fetch-api)
- [Tenor API](https://tenor.com/gifapi/documentation)

## Reviewer role

Present the app as if you were presenting it to a Turing College developer. You will need to demonstrate how the bot works in your private server and how you can test your application without interacting with a real Discord server. Explain the code as if you are explaining it to a technical team lead.

During a task review, you may get asked:

- to answer questions that test your understanding of covered topics
- to perform live coding to fix a bug or add a feature
- to demonstrate your ability to perform a TDD cycle

**Sample questions for a reviewer to ask (a reviewer is encouraged and expected to think of more, however!)**

- What are the current bot's and server's limitations?
- How would you improve the bot's and server's functionality?
- How have you tested the REST API and bot's functionality?
- How easy would it be to {add a new feature, change an existing feature, remove a feature}?

## Project evaluation criteria

- Bot functionality: The bot works according to the requirements.
- Data management: Data is stored and retrieved from the database according to the requirements.
- Testing: Learner has tested the REST API, and interactions with Discord API to allow for easy refactoring, adding new features, and delivering software confidently.
- Knowledge: General understanding of topics from Module 2 Sprint 2.
- Live coding: Ability to explain and adapt the code during the correction.

## Submission

To submit the project and allow the reviewer to view your work beforehand, go to your GitHub repository by clicking on the GitHub icon above. Next, select "Add File"->"Upload Files". Choose the files you worked on to upload them, then click the green "Commit changes" button. Once you have completed all the steps of the project and uploaded your work, go to the Turing Platform and click the "Submit Project" button to complete it. The platform then allows you to see the times when reviewers are available to have a call with you and review the project. Simply book a time that suits you.

**Estimate average time to complete: 25 hours**
