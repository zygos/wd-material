Some concepts that should be introduced, in no particular order:
- TDD (Test Driven Development) with Vitest
- Back-end frameworks, such as Express
- Data Structures
- Data modeling
- SQL and SQL Databases, such as PostgreSQL
- GitHub Flow, Pull requests, Issues
- CI/CD and environments
- Bash Scripting for CI/CD, GitHub Actions
- Agile and Scrum
- Peer project with mock interview
- Security & Scalability
- Docker basics
- Scalability
- Cloud services, AWS
- Serverless functions
- Connecting BE with FE
- Back-end deployment
- SSH

=== Module 3: Back-end development with Node ===

--- Sprint 1: Using Node.js for the back-end ---

# Part 1: Back-end servers and Node.js
## Back-end servers and their role, examples from real-world applications
## Back-end server architectures
## Server terminology
## Exercise: Setting up a Node.js server, with use-cases from real-world scenarios
## Setting up a Node project with TypeScript and Vite
## Core Node.js Modules
## Exercise: Reading and writing files with fs in real-world situations
## Debugging a Node application
## Exercise: Implement rate limiting in a Node.js application
## Further research: Nginx, Apache

# Part 2: Express.js and REST APIs
## REST APIs with real-world examples
## API design
### Command Query Responsibility Segregation
## Introduction to Express.js
## Routes and Middleware
## Express documentation
## Handling Errors
## Exercise: Building a simple API endpoint with Express.
## Further research: GraphQL, gRPC, WebSockets

# Part 3: Test-Driven Development (TDD)
## Introduction to TDD
## Writing tests before code
## Exercise: Vitest
## Red-Green-Refactor cycle in TDD
## Mocking in Vitest
## Exercise: Writing tests for a Node.js application

# Part 4: Hands-on: TDD with Node.js
Responding to a given scenario, write tests before implementing the functionality. The task involves reading and storing data from a CSV file and performing requests to an external API. (Provide detailed expectations and criteria)
Additional: Implement caching mechanisms in Node.js application

# Part 5: Peer project – Interview (2 Peer)
Participate in a code review project. Take turns acting as the interviewee and interviewer. Prepare three tasks for review: an exercise solution, questions for the interviewer role, and a live coding challenge. Focus on data structures and algorithms in your solutions.

--- Sprint 2: Databases & Data Modeling ---

Resources:
- https://www.prisma.io/dataguide/intro/what-are-databases

# Part 1: Data Modeling
## Using Diagrams for Data Modeling
## Data relationships
## UML
## Sequence and Activity Diagrams in UML
## Exercise: Creating a UML diagram to model data for an e-commerce website
## Database Types (SQL vs NoSQL)

# Part 2: Relational databases and SQL
## Introduction to SQL
## PostgreSQL setup
## Exercise: Creating an e-commerce database and tables
## Exercise: Inserting and querying data
## Exercise: Updating and deleting data
## Relationships in SQL
## Joins
## Foreign keys
## Further research: Transactions, ACID, Migrations, Normalization, Indexing, Constraints

# Part 3: Databases in Node.js
## Connecting to a Postgres
## SQL in Node.js
## Query builders: Kysely
## Exercise: Inserting and querying data in your e-commerce database using Node.js
## ORMs: Pros & Cons
## ORMs: Prisma
## Exercise: Updating and deleting data in your e-commerce database using Node.js
## Further research: Planetscale, Neon, RabbitMQ, Redis

# Part 4: Hands-on: Importing and Exporting Data
Practice parsing and syncing data from CSV files into a database using Node.js.

# Part 5: Practical Project – Full CRUD API with a Database (1 Peer + 1 STL)
Design a database schema for an e-commerce website and build a full CRUD API with Node.js, Express.js, and PostgreSQL.

--- Sprint 3: Collaborative Development and Best Practices ---

# Part 1: Scalability and Security
Resources: https://cs50.harvard.edu/web/2020/weeks/8/
## Fundamentals of web security
## Sanitization and Validation
## Exercise: Data validation with zod
## Encryption (bcrypt, scrypt, etc.)
## Authentication
## Authentication flows (Basic Auth, Sessions, Cookies, JWTs, OAuth)
## Exercise: Implementing authentication in your e-commerce API
## Authorization
## Exercise: Implementing authorization in your e-commerce API
## Defensive programming
## HTTP headers (CORS, CSP, HSTS, etc.)
## Preventing common security risks – OWASP Top Ten
## Exercise: Identify and fix security issues
## Exercise: Applying some best practices to an Express app
## Scaling databases: Data Replication, Sharding, Caching, CAP Theorem
## Further research: using 3rd party authentication services

# Part 2: Collaborative Development
## Git Flow, GitHub Flow, GitLab Flow, trunk-based development
## Creating and managing Pull Requests
## Filing and resolving Issues
## Continuous Integration/Continuous Delivery (CI/CD)
## Bash Scripting for CI/CD, GitHub Actions
## Exercise: Building your own GitHub Actions workflow
- Resources:
  - https://cs50.harvard.edu/web/2020/weeks/7/ (57:10 - 1:19:00)
## Further research: GitLab, Jenkins

# Part 3: Working in a team
## Code Reviews
## Agile methodology
## Scrum
## Kanban
## Further research: ...

# Part 4: Hands-on: Solving issues in a GitHub repository
Picking an issue in a shared on a GitHub repository. Collaborating with a peer to solve the issue and create a Pull Request.

# Part 5: Practical Project – Full Stack Application (1 Peer + 1 STL)
Build a marketplace API using Express, PostgreSQL, and authentication.

--- Sprint 4: Back-end Deployment ---

# Part 1: Docker Basics
## Introduction to Docker
## Creating a Dockerfile and building Docker images
## Running applications inside Docker containers
## Exercise: Building and running a Docker image of your marketplace API
## Further research: Kubernetes, Docker Compose
- Resources:
  - https://cs50.harvard.edu/web/2020/weeks/7/ (1:19:00 onwards)

## Part 2: Cloud Services
## Server types (Serverless, SOA, Microservices, Monolith)
## Introduction to Cloud Services with AWS
## Creating serverless functions with AWS Lambda
## Deploying applications on AWS EC2
## SSH and SSH keys
## Deploying applications to AWS using GitHub Actions and containers
## Understanding scalability
## Further research: CDNs, Edge computing, Terraform

## Part 3: Error management, Logging and Monitoring
## Introduction to logging
## Logging in Node.js (Pino)
## Introduction to monitoring (Sentry)
## Monitoring in Node.js
## Exercise: Implement logging and monitoring in your marketplace API
## Further research: Sentry, Logstash, Elasticsearch, Prometheus, Grafana, Checkly

## Part 4: Capstone project (1 Peer + 1 STL)
Create a full-stack application with a robust back-end. Ensure it handles user authentication and manages data efficiently.
