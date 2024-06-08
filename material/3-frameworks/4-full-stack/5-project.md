Part 5: Capstone Project foundations

Welcome to your first full-stack capstone project! 🎉

Your back-end capstone project will be your crowning achievement for your web development journey up to date. You will need to combine all the skills and understanding you gained in previous modules to create a workable full-stack application.

Given that a full-stack application can have many moving parts, **we have split the capstone project into two parts**. In this sprint, you will **focus on picking the right idea** and **building your initial back end**. In the next sprint, you will build on top of what you managed to create in this sprint.

## Project description

This sprint project aims to lay the groundwork for a full-stack capstone project that you will further build upon.

**Idea**

You need to choose a unique and compelling project idea, then start building the back-end with some rudimentary functionality. The back end should represent at least 50% of your final project server code. Given that you will have two sprints to work on your capstone, spend a reasonable amount of time picking the right idea.

Think of a problem you'd like to solve or a hobby you're passionate about and how a web application could enhance that experience. Try to look for an application that is personal to you and that you would use yourself. This will help you stay motivated throughout the project and better understand the user's perspective. Otherwise, you might end up with a project that makes up fake requirements and could not be used by anyone. The crucial part is to pick an idea that is not too simple and allows you to showcase your skills.

From a technical point of view, your project should require more than a simple CRUD API. Think about possible external APIs that you could use to enhance your project. If relevant to your project, you can also use technologies not covered in this module, such as WebSockets, GraphQL, Web Workers, and Blockchain.

**Planning**

Once you've chosen your project, start creating an initial architecture plan. This plan could include use-case descriptions, diagrams, a list of tasks, or pseudocode. Remember that this plan doesn't need to be perfect but will guide your development process. You might find yourself adapting and changing many requirements in time.

**Development**

After you're satisfied with your plan, start developing your back end. Remember to review what you've learned in this module regularly to ensure you're using most, though not necessarily all, of the covered tools and techniques.

While a front-end is not a primary goal of this project, you could start working on it. This could give you a head start for your next sprint. However, remember the focus is mainly on the back end for this module and especially for this sprint.

## Technical requirements

Your application needs to fulfill the following technical requirements:

- It is written in TypeScript.
- It uses a database. You can pick any database(s) you prefer apart from SQLite.
- Use Express.js with tRPC or a plain Express.js REST server.
- Have at least 70% back-end line test coverage for your initial server functionality. You can use Vitest or Jest.
- The project should have a monorepo structure even if it does not have a front end at this point.
- You can use Vue or React if you start working on the front end in this sprint.
- The application needs to use user authentication. You can use third-party services, such as Auth0.
- The project should be in a working state and have a README file with instructions on how to run it and how to "poke" its existing functionality via tests, API calls, or a provided front-end.

Feel free to use hands-on exercises and previous projects as a boilerplate. However, ensure that you use your unique entities for this project. Reusing the same entities (movies, projects, bugs) is not allowed, but you can (and probably should) reuse the project setup, utility functions, etc. if that makes sense for your project.

At this point, you do not need to host your project. However, you should be able to run your project with `npm run dev` for demonstration purposes.

## Reviewer role

In this project, your review will be split into two parts.

1. In the first part (~20 mins), you present your existing project. In this part, you will interact with the reviewer as if presenting your project to a different developer. Your goal is to present your current progress briefly - the problem you are solving, your current back-end endpoints, and how you are testing them. You should use this time to ask for advice.
2. The remaining time will be spent on a live coding exercise. You will be asked to **add or fix a minor feature in your project** or **write a solution for a problem outside your existing project**. In either case, you will need to **start with writing at least one test case** for the feature you are about to implement. Following TDD down to the letter is optional, but you must demonstrate a good enough understanding of this general flow. You should imagine coding in a live session with a technical interviewer during a job interview.

You must prepare a basic TypeScript environment in case you need to write code outside your project. A minimal setup should allow you to run and test TypeScript code in a Node environment. There is no need to set up a database, linting, formatting, etc. You do not need to commit this coding environment to your repository. It might be required only during the interview part.

## Project evaluation criteria

- The project scope is challenging and suitable for demonstrating various web development skills.
- Learner has made sufficient progress in the project to showcase minimal back-end functionality.
- Ability to apply test-driven development during a live coding exercise.
- Ability to write an implementation during a live coding exercise.
- General understanding of topics from sprint 3.

During a task review, you may get asked questions that test your understanding of covered topics.

**Sample questions for a reviewer to ask**
- What are the main features of your application? How did you implement them?
- What are the main challenges you faced during the development process?
- What are the remaining issues you need to solve?
- How will you ensure that your front-end and back-end are communicating correctly?

# Submission

Submit your files to this project's GitHub repository.

Read an in-depth guide about corrections here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections

**Estimate average time to complete this part: 30 hours**
