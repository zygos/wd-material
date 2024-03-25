1-node:
# Part introduction
# Key learning topics & resources for this part
## Introduction to Back-end Servers (0.5 hours)
## Back-end stacks (0.5 hours)
## Introduction to Node.js (2 hours)
## Understanding Core Node.js Globals and Modules (1 hour)
## Exercises: Using core Node.js modules (2 hours)
**Exercise 1: Reading a file**
**Exercise 2: Writing to a file**
**Solution 2:**
**Exercise 3: Adding a file to a directory**
**Solution 3:**
## Node.js with TypeScript (1 hour)
**A note on top-level await**
## Exercise: Setting up Linting and Formatting (1 hour)
**Setting up Prettier**
**Setting up ESLint**
# Directions for further research (2 hours+)
## Optional: Back-end terminology (2 hours)

2-sql:
# Part introduction
# Key learning topics & resources for this part
## Databases (0.5 hours)
**Relational databases**
**Non-relational databases**
**Important notes to follow the lecture:**
# Directions for further research (2 hours+)

3-data-modeling:
# Part introduction
# Key learning topics & resources for this part
# Exercises: SQL Zoo (3 hours+)
## Exercise: Modeling Instagram database tables (2 hours)
**Instagram**
## Exercise: Creating tables (0.5 hours)
## Exercise: Migrating schemas (1.5 hours)
## Exercise: Creating tables in Node.js (0.5 hours)
# Directions for further research (3 hours+)

4-hands-on:
# Task Description
## Requirements
## Bonus Challenges
## Recommended Step-by-Step Approach
## Approach to Solving the Task

5-project:
## Task description
## Preparation
## Questions
## Take-home questions
## Reviewer role
### As an interviewer, you will need to:
### As an interviewee, you will need to:
## Project evaluation criteria
# Submission

1-rest:
# Part introduction
# Key learning topics & resources for this part
## Node.js servers (0.5 hours)
**What is an HTTP request?**
**Let's create a Node.js server.**
## REST APIs (1 hour)
**How are REST APIs different from other types of APIs?**
**REST APIs vs non-REST APIs**
**Path structure**
**Not all RESTs are alike**
**Additional REST Principles**
# Retrieve a list of all blog posts
# Retrieve a list of specific blog posts
# Retrieve a specific blog post
# Create a new blog post
# Update a specific blog post
# Delete a specific blog post
# All requests use:
## REST APIs with Express.js (0.5 hours)
## Setup: Express.js with TypeScript (0.5 hours)
## Express.js: Middleware (0.5 hours)
## Exercise: Add routes to an Express application (2 hours)
## Using Express.js with TypeScript (1 hour)
## Controllers vs Services vs Models (0.5 hours)
**Application structure**
**Common data flow pattern**
## Exercise: Using a controller and a model (1 hour)
## Migrations (0.5 hour)
## Automating migrations (1 hour)
**Import the createArticleTable file in the migrate.ts file and add it to the migrations array.**
**Adding new migrations**
## Exercise: Use SQLite database in article model (1 hour)
## Examining a provided solution (1 hour)
# Directions for further research (1 hour+)
**Optional advanced directions for further research:**
## Optional: Common use cases for Express middleware (0.5 hours)

2-query-builders:
# Part introduction
# Key learning topics & resources for this part
## Abstractions over SQL (0.5 hours)
## Kysely (1 hour)
## Exercise: use Kysely database instance (0.5 hours+)
## Exercise: migrate to Kysely migrations (1 hour)
## Exercise: use a query builder in the article model (1 hour)
## Validation and parsing (0.5 hours)
## Exercise: Using Zod to parse the provided data and type user requests (1 hour)
## Exercise: Putting it all together (2 hours)
## Review the provided solution (2 hours)
# Directions for further research (1 hour+)

3-tdd:
# Part introduction
# Key learning topics & resources for this part
## Test-Driven Development (TDD) (1 hour)
## Exercise: Refactoring Anagrams (3 hours)
**We have two problems:**
**Add tests for these scenarios and make sure they pass.**
## Exercise: Test Doubles and Mocks (1 hour)
## Code coverage (0.5 hours)
**Instead of maximizing a metric, focus on adopting practices aligned with the underlying reason why that metric is measured.**
## Dependency injection (1 hour)
## Exercise: Anagrams with dependency injection (2 hours)
## Dependency injection with objects (1 hour)
# Directions for further research (1 hour+)
## Optional: (Advanced) DI with function factories (1 hour)

4-pair-programming:
# Key learning topics & resources for this part
## Testing Express applications (1 hour)
## Example: Testing Express app with unit tests, integration tests and using DI (3 hours)
# Peer programming exercise (16 hours)
**Make sure to review the template code before starting the exercise.**
**Here are some high-level requirements for the application:**
**Administrators should be able to:**
**Users should be able to:**
**Technical requirements:**
**How to organize peer programming for this task:**

5-project:
## Project Description
## Project requirements
**Additional comments:**
## Additional comments
## Bonus challenges (optional)
## Starting resources
## Reviewer role
## Project evaluation criteria
## Submission

1-postresql-orm:
# Part introduction
# Key learning topics & resources for this part
## SQLite limitations
## PostgreSQL (4 hours)
**Starting with PostgreSQL**
**Differences between SQLite and PostgreSQL**
**SQLite vs PostgreSQL queries**
**Data types in PostgreSQL**
## PostgreSQL: Connecting using a GUI client (0.5 hours)
## PostgreSQL: Connecting from Node.js (0.5 hours)
## ORMs
## TypeORM (3 hours)
## Migrations with TypeORM
## Exercises: Entities and Data Mapper with TypeORM (5 hours)
# Directions for further research (1 hour+)

2-full-stack-type-safety:
# Part introduction
# Key learning topics & resources for this part
## Full-stack type safety (1.5 hours)
**First of all, what is RPC?**
**What is tRPC?**
## Exercise: Setting up tRPC (1 hour)
## Exercise: Writing and testing tRPC endpoints (6 hours)
# Directions for further research (1 hour+)

3-authentication-authorization:
# Part introduction
# Key learning topics & resources for this part
## Exercise: Handling passwords (4 hours)
**What should you do with your current SECRET_SALT?**
## Authentication vs. Authorization (0.5 hours)
## Cookies, Sessions, JWTs (1.5 hours)
## Exercise: Authentication (4 hours)
# Directions for further research (2 hours+)

4-hands-on-guide:
### Step 1. Setup
### Step 2. Think through required API endpoints
### Step 3. Start with the signup and login endpoints
### Step 4. Add an endpoint for creating a project
### Step 5. Add endpoint for finding user's projects
### Step 6. Add endpoints for reporting and finding bugs
### Step 7. Add an endpoint for marking a bug as resolved
### Step 8. Using the signup E2E test, replace fake client signup with signup through the server
### Step 9. Add real login and authentication to the client
### Step 10. Add route guards to protect routes that require authentication
### Step 11. Replace fake front-end data with real data from API calls
### Step 12. Add any missing endpoints and handle errors

4-hands-on-server-client-monorepo:
# Part Introduction
# Key learning topics & resources for this part
## Monorepos (0.5 hours)
## Exercise: Monorepos with NPM Workspaces (1 hour)
**How should you work with monorepos in your IDE?**
# Task Description
## Requirements
## Technical requirements
## Project starter
## Recommended approach
## How to work with a monorepo
## Additional comments
**The role of `server/shared` folder**
## Bonus challenges
## Approach to Solving the Task

5-project:
## Project description
**Idea**
**Planning**
**Development**
## Technical requirements
## Reviewer role
## Project evaluation criteria
# Submission

1-GitHub Actions and Docker:
# Part introduction
# Key learning topics & resources for this part
## CI/CD and GitHub Actions (1.5 hours)
## Exercise: Using GitHub Actions to test a monorepo (1 hour)
## Exercise: Setup GitHub pipeline to test your capstone (1.5 hours)
## Containerizing an application (1 hour)
## Exercise: Play with Docker Classroom (2 hours)
## Exercise: Using Docker Compose (2 hours)
# Imagine we have already built a few containers
## Exercise: Containerize Your Capstone Project (1.5 hours)
## Directions for Further Research (1 hour+)
## Optional Exercise: Building and Bundling Back-End Code (2 hours)
**CommonJS builds**
**ES Module builds**

2-Deploying Containers with Cloud Services:
# Part introduction
**Goals:**
**Limitations:**
# Key learning topics & resources for this part
## Managed infrastructure (0.5 hours)
## Introduction to Cloud Services and AWS (1 hour)
## Signup for AWS account (0.5 hours)
## Deployment (0.5 hours)
**Set up a place for our database.**
## Exercise: Deployment (2 hours)
**Set up a place for our containers to run: AWS Lightsail**
**Set up a way to connect to AWS from a command line: AWS IAM**
**Let's create a user inside of a group:**
**Deploy from your machine.**
## Example: GitHub Actions to build and deploy a monorepo (1 hour)
## Exercise: Setup GitHub Actions to build and deploy your capstone project (2 hours+)
# Directions for further research (1 hour+)

3-Best back-end practices:
# Part introduction
# Key learning topics & resources for this part
## HTTP, SSL, and TLS (1.5 hours)
## Logging (1.5 hours)
## Exercise: Set up a logger (3 hours)
## Exercise: Error management with Sentry (3 hours)
**Development side**
**Environment variables and deployment**
## Performance Optimization (0.5 hours)
# Directions for further research (1 hour+)
## Optional Exercise: Set up a process manager (1 hour)
**Launching multiple processes**
## Optional: NGINX and Express configuration (1 hour)
**Setting Up HTTP Headers**
## Optional resources: Security Exercises and additional resources

4-Full Stack Capstone:
## Project description
## Technical requirements
## Reviewer role
## Project evaluation criteria
# Submission

