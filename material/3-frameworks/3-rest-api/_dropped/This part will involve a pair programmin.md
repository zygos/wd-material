This part will involve a pair programming exercise where you will work with another learner to build a REST API server for a movie ticket booking system. You will be using TDD (Test-Driven Development) to develop your application, along with git, with a focus on conventional commits.

The exercise will require you to work with packages like TypeScript, Express.js, Kysely with SQLite, zod, Vitest, supertest, ESLint, and Prettier.

Throughout this exercise, you will be expected to use TDD, which involves a cycle of writing a test, failing it, writing code to pass it, and then refactoring it. This practice ensures that you write code that meets specifications and avoids bugs.

# Key learning topics & resources for this part

{{ MUST: add }}

# Peer programming exercise (20 hours)

**Here are some high-level requirements for the application:**

For this application, we will ignore the permissions and authentication part of the application. To limit our scope, we will assume that your endpoints will be reached only by users who have the correct permissions to do so.

**Administrators should be able to:**

- create new viewing sessions for watching a movie that has a timestamp and a provided allocation of tickets
- delete viewing sessions while they are empty
- change a session's ticket allocation as long as it is not lower than the number of reserved tickets
- create new movies in the database by providing data for the movie and its rating

**Users should be able to:**

- get a list of movies that are available for booking
- get a list of bookings they have booked
- get a list of any movies by providing a list of their IDs
- book a session that has some tickets left
- bonus challenge: cancel a booked session
- bonus challenge: get individual movie information with all the additional details about it on a single endpoint - ratings, directors, and stars (as people)

**Technical requirements:**

1. You will be provided with an initial starting template. You are free to add more packages.
2. User and administrator inputs should be validated.
3. Database schema changes should be done using migrations. You can adapt the provided database schema to match your needs by adding more tables or changing the existing ones.
4. Application code should have unit and integration tests. Shoot for 80% - 95% test coverage.
5. Commits should follow the Conventional Commits standard. Commit early, commit often.

Try to think about requirements that are not explicitly stated and possible edge-cases. You are free to make assumptions about the requirements as long as you document them in your code. You can discuss your assumptions with your pair programming partner. In this exercise you have a decent amount of freedom to make decisions about the application scope. The focus of this exercise is on the process.

**How to organize peer programming for this task:** 

**Step 1:** Each learner should create a new public GitHub repository. Download and commit the starter repository to the repo.

**Step 2:** In the README file, document the requirements for your program. These should be based on the high-level requirements mentioned above, but should be more detailed and specific. For instance, under "create new viewing sessions for watching a movie", you might specify what data needs to be input (e.g., movie id, session timestamp(s), total tickets allocation), what the output should be, and any constraints (e.g., session time must be in the future, total ticket allocation must be a positive integer). Commit your requirements document before writing any code.

**Step 3:** Reach out to other learners to arrange a time for a pair programming session. You should aim to have at least 3 pair programming sessions for this task. You can work on your project and join others to work on theirs. Remember, each learner will have their own repository and their own implementation of the application.

**Step 4:** Before each pair programming session, break down the upcoming tasks into small GitHub issues. Try to break down tasks that you think will take about half of your scheduled session time to avoid task switching. Assign the GitHub issue you'll be working on when the session starts.

**Step 5:** During the session, one person will start off with writing some small tests and trying to get them pass while the other observes and provides feedback. After half of the session time, commit and push your changes to the repository. Then, switch roles for the second half of the session.

**Step 6:** After each session, review the code together. Discuss what you did well and what you could improve next time. Look at your test coverage and discuss any parts of your code that could benefit from more thorough testing. You can also discuss the opposite - are there any areas that are needlessly tested lots of times and if those parts would break, you would need to go back and update lots of files. Shoot for tests not only fail, but also point to the cause of their failure.

**Step 7:** Between sessions, continue to work on your project. Prioritize work that will maximize your learning, whether it's writing tests, refactoring code, or implementing new features. However, make sure there are enough tasks left for your pair programming sessions. If you complete most of the tasks, consider extending your application's scope or joining others' projects for their sessions.

**Step 8:** Repeat Steps 4-7 until you've completed at least 3 pair programming sessions. In your final session, focus on refactoring and polishing your code. Make sure your tests pass, your code passes the linter and it is formatted.

Remember, the goal of this exercise is to practice pair programming and test-driven development, not to build a perfect application. Don't worry if your application isn't perfect - the main thing is that you've learned from the process.

**Note: due to potentially needing to wait for the pair-programming sessions, you can work on this project parallel to the main project. In extreme cases, you may even complete this part after passing this sprint's corrections.**