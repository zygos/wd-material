Part 4: TDD with Express.js

This part will involve a pair programming exercise where you will work with another learner to build a REST API server for a movie ticket booking system. You will be using TDD (Test-Driven Development) to develop your application, along with git, with a focus on conventional commits.

The exercise will require you to work with packages like TypeScript, Express.js, Kysely with SQLite, Zod, Vitest, supertest, ESLint, and Prettier.

Throughout this exercise, you will be expected to use TDD, which involves a cycle of writing a test, failing it, writing code to pass it, and then refactoring it. This practice ensures that you write code that meets specifications and avoids bugs.

# Key learning topics & resources for this part

## Testing Express applications (1 hour)

We have gone through some examples of how to test a module in our previous part. When dealing with a module you can isolate, you should use the same approach.

What about Express.js applications? Express.js applications tend to have 2 types of tests:

- unit tests - tests that check the behavior of modules in isolation. Great for repositories, schemas, and layers over 3rd party APIs.
- integration tests - tests that check the behavior of our application with its dependencies. This is great for testing routes and your entire application.

In Express, unit tests can look like the ones we have written in the previous part. Meanwhile, integration tests will require us to write expectations on the HTTP response. We will use a library called [supertest](https://www.npmjs.com/package/supertest) which is well-suited for testing Express.js applications.

**Notes on videos:** We will provide some videos below illustrating a good general walkthrough of testing Express apps. However, it will not necessarily use the same code snippets that you we would recommend to write:
We will be using a starting template with all necessary testing dependencies provided (Vitest, Supertest). For easier setup, we are using Vitest instead of Jest. So there is no need to install additional packages.
We advise against using loops inside of tests. Tests can have utility functions for setting up some data and performing expectations, but generally there should be little to no iterative logic inside of a test case. Every test should consist of 3 easy to understand parts - **Arrange**, **Act**, **Assert** (Given, When, Then).

- Watch: [Testing Node Server](https://www.youtube.com/watch?v=FKnzS_icp20) (15 min)
- Watch/Read: [Dependency Injection](https://www.sammeechward.com/dependency-injection-in-javascript) (20 min)

## Example: Testing Express app with unit tests, integration tests and using DI (3 hours)

We will revisit our Express.js blog application as a familiar example. [Download](https://drive.google.com/file/d/16p1KGNZ2Q2AOsL-Jf4RuUZUAJHKDmxaW/view?usp=drive_link) and review the provided `server-3` blog application code. It has some significant differences from the previous versions:

- it has tests, not complete coverage, but enough to see most of the patterns. Tests are located close to the modules they are testing (i.e. `modules/articles/tests`). **Spend time going through the test examples.**;
- it has additional test utilities for creating test database instances and running migrations;
- it uses a new temporary in-memory database in tests every time. This means we are not using a mock database;
- it uses **dependency injection** to provide a database instance to all modules that need it;
- it has the Vitest setup and is ready to go, including globally available it, expect, ... imports in tests, so **there is no need to import Vitest functions (it, expect, vi…) in test files**;

Advanced optional utility functions:
- tests have `fake*` utilities that produces a basic cookie-cutter object that can be used to create a new object in the database. This allows us to create isolated tests that are easy to fix when our database evolves;
- tests have `*Matcher` utilities, which has the same purpose as `fake*` but is used for testing the shape of the server response.

For this project, a database is provided through DI to controllers and controllers provide it to other modules. This means all modules needing a database instance will receive it as a parameter. A project with stricter DI would provide controllers with services, services with repositories, etc. However, this would be an overkill for our simple application.

# Peer programming exercise (16 hours)

To save time on data exploration and focus on the process, we will use the database you already know well - `movies.db`. We will use it to build a movie ticket booking system. The system will allow users to book tickets for movies and administrators to perform a few basic management tasks.

**Make sure to review the template code before starting the exercise.**

[Download the starting template](https://drive.google.com/file/d/1CIOnbDKHkKNauINshur0-wEkScAMKTqL/view?usp=drive_link).

The provided `server-template` is a starting point and it already has set up migrations, testing and DI. It should not surprise you if you have familiarized yourself with the provided example in the previous section. It also allows testing the application with a production database to allow writing tests without any data seeding.

It has `repository.spec.ts` which **uses an in-memory database**, which tests the repository layer in isolation without any data. It also has `movies.spec.ts` which shows an example of **using the real database**, which runs the tests with real `movies.db` data.

**Here are some high-level requirements for the application:**

**Note:** For this application, we will ignore the permissions and authentication part of the application. To limit our scope, we will assume that your endpoints will be reached only by users who have the correct permissions to do so. Therefore, administrators and users do not have any functional differences. You can treat them as the same entity. They are separated only for the sake of illustration.

**Administrators should be able to:**

- **Screening.** create new viewing screenings for watching a movie that has a timestamp and a provided allocated number of tickets
- optional requirement: delete viewing screenings while they are empty
- optional requirement: change a screening's ticket allocation as long as it is not lower than the number of reserved tickets

**Users should be able to:**

- **Movie.** get a list of movies with their title and year by providing a list of their IDs (e.g., `/movies?id=1,2,3`)
- **Screening**. get a list of screenings available for booking. Screenings should include session information (timestamp, number of tickets, number of tickets left) and movie: (title and year).
- **Ticket**. get a list of bookings (tickets) they have booked
- **Ticket**. create a booking (ticket) for movie screening that has some tickets left

**Technical requirements:**

1. You will be provided with an initial starting template. You are free to add more packages.
2. User and administrator inputs should be validated.
3. **Database schema changes must be done using migrations**. You can adapt the provided database schema to match your needs by adding more tables or changing the existing ones.
4. Application code should have unit and integration tests. Shoot for 80% - 95% test coverage.
5. Commits should follow the Conventional Commits standard. Commit early, commit often.

Try to think about requirements that are not explicitly stated and possible edge-cases. You are free to make assumptions about the requirements as long as you document them in your code. You can discuss your assumptions with your pair programming partner. In this exercise you have a decent amount of freedom to make decisions about the application scope. The focus of this exercise is on the process.

You do not need to implement seat reservations. You can assume that a user can book a ticket for any seat in the room. You can also assume that a user can book multiple tickets at once. Focus on the core functionality of the application.

**How to organize peer programming for this task:**

**Step 1:** Each learner should create a new public GitHub repository. Download and commit the starter repository to the repo.

**Step 2:** In the README file, document the requirements for your program. These should be based on the high-level requirements mentioned above, but should be more detailed and specific. For instance, under "create new screenings for watching a movie", you might specify what data needs to be input (e.g., movie id, screening timestamp(s), total tickets allocation), what the output should be, and any constraints (e.g., screening time must be in the future, total ticket allocation must be a positive integer). Commit your requirements document before writing any code.

**Step 3:** Reach out to other learners to arrange a time for a pair programming session. You should aim to have at least 3 pair programming sessions for this task. You can work on your project and join others to work on theirs. Remember, each learner will have their own repository and their own implementation of the application.

**Step 4:** Before each pair programming session, break down the upcoming tasks into small GitHub issues. Try to break down tasks that you think will take about half of your scheduled session time to avoid task switching. Assign the GitHub issue you'll be working on when the session starts.

**Step 5:** During the session, one person will start off with writing some small tests and trying to make them pass while the other observes and provides feedback. After half of the session time, commit and push your changes to the repository. Then, switch roles for the second half of the session.

**Step 6:** After each session, review the code together. Discuss what you did well and what you could improve next time. Look at your test coverage and discuss any parts of your code that could benefit from more thorough testing. You can also discuss the opposite - are there any areas that are needlessly tested lots of times and if those parts would break, you would need to go back and update lots of files. Shoot for tests not only fail, but also point to the cause of their failure.

**Step 7:** Between sessions, continue to work on your project. Prioritize work that will maximize your learning, whether it's writing tests, refactoring code, or implementing new features. However, make sure there are enough tasks left for your pair programming sessions. If you complete most of the tasks, consider extending your application's scope or joining others' projects for their sessions.

**Step 8:** Repeat Steps 4-7 until you've completed at least 3 pair programming sessions. In your final session, focus on refactoring and polishing your code. Make sure your tests pass, your code passes the linter and it is formatted.

Remember, the goal of this exercise is to practice pair programming and test-driven development, not to build a perfect application. Don't worry if your application isn't perfect - the main thing is that you've learned from the process.

**Note: due to potentially needing to wait for the pair-programming sessions, you can work on this project parallel to the main project. In extreme cases, you may even complete this part after passing this sprint's corrections.**
