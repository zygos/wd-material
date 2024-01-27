=== Module 3: Back-end development with Node ===

--- Sprint 1: Serverless ---

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

# Part 2: Test-Driven Development (TDD)
## Introduction to TDD
## Writing tests before code
## Exercise: Vitest
## Red-Green-Refactor cycle in TDD
## Mocking in Vitest
## Exercise: Writing tests for a Node.js application

# Part 3: Hosting & Cloud Services
## Introduction to Cloud Services with AWS
## Creating serverless functions with AWS Lambda
## Deploying applications on AWS EC2
## SSH and SSH keys
## Deploying applications to AWS using GitHub Actions and containers
- Resources:
  - https://cs50.harvard.edu/web/2020/weeks/7/ (57:10 - 1:19:00)
## Further research: CDNs, Edge computing, Terraform

# Part 4: Hands-on: Building a serverless Discord bot
Responding to a given scenario, write tests before implementing the functionality. The task involves reading and storing data from a CSV file and performing requests to an external API. (Provide detailed expectations and criteria)
Additional: Implement caching mechanisms in Node.js application
Stack: JavaScript + Lambda/Vercel/Cloudflare Workers

# Part 5: Peer project – Interview (2 Peer)
Participate in a code review project. Take turns acting as the interviewee and interviewer. Prepare three tasks for review: a take-away exercise, knowledge-testing questions, and a live coding challenge. Focus on data structures and algorithms in your solutions.

--- Sprint 2: Single-machine REST API server ---

Resources:
- https://www.prisma.io/dataguide/intro/what-are-databases

# Part 1: Express.js and REST APIs
- Resources: https://www.youtube.com/watch?v=ENrzD9HAZK4
## REST APIs with real-world examples
## API design
### Command Query Responsibility Segregation
## Introduction to Express.js
## Routes and Middleware
## Express documentation
## Handling Errors
## Exercise: Building a simple API endpoint with Express.
## Further research: GraphQL, gRPC, WebSockets

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

# Part 3: PostgreSQL in Node.js
## Connecting to PostgreSQL
## SQL in Node.js
## Query builders: Kysely
## Exercise: Inserting and querying data in your e-commerce database using Node.js
## Exercise: Updating and deleting data in your e-commerce database using Node.js
## Further research: Planetscale, Neon, RabbitMQ, Redis

# Part 4: Hands-on: Local REST API server (CSV file syncing with a database)
Practice parsing and syncing data from CSV files into a database using Node.js.

# Part 5: Practical Project – Blog back-end (1 Peer + 1 STL)
Design a database schema for a blog and build a full CRUD API with Node.js, Express.js, and PostgreSQL.

--- Sprint 3: REST API server in the cloud ---

# Part 1: Data Modeling
## Using Diagrams for Data Modeling
## Data relationships
## UML
## Sequence and Activity Diagrams in UML
## Exercise: Creating a UML diagram to model data for an e-commerce website
## Database Types (SQL vs NoSQL)

# Part 2: Authentication and Authorization
## Encryption (bcrypt, scrypt, etc.)
## Authentication
## Authentication flows (Basic Auth, Sessions, Cookies, JWTs, OAuth)
## Exercise: Implementing authentication
## Authorization
## Exercise: Implementing authorization
## Further research: using 3rd party authentication services

# Part 3: Collaborative Development
## Continuous Integration/Continuous Delivery (CI/CD)
## GitHub Actions
## Exercise: Building your own GitHub Actions workflow
## Code Reviews
## Agile methodology
## Git Flow, GitHub Flow, GitLab Flow, trunk-based development
## Creating and managing Pull Requests
## Filing and resolving Issues
## Further research: GitLab, Jenkins, Scrum, Kanban

# Part 4: Hands-on: Solving issues in a GitHub repository
Picking an issue in a shared on a GitHub repository. Collaborating with a peer to solve the issue and create a Pull Request.

# Part 5: Practical Project – Full Stack Application (1 Peer + 1 STL)
Build a marketplace API using Express, PostgreSQL, and authentication.

--- Sprint 4: Containerization ---

# Part 1: Docker Basics
- Resources:
  - https://cs50.harvard.edu/web/2020/weeks/7/ (1:19:00 onwards)
## Introduction to Docker
## Creating a Dockerfile and building Docker images
## Running applications inside Docker containers
## Bash Scripting for CI/CD
## Exercise: Containerizing a Node.js application
## Exercise: Building and running a Docker image of your marketplace API
## Exercise: Deploying containers to AWS using GitHub Actions
## Further research: Kubernetes, Docker Compose

# Part 2: Scalability and Security
Resources: https://cs50.harvard.edu/web/2020/weeks/8/
## Fundamentals of web security
## Sanitization and Validation
## Exercise: Data validation with zod
## Defensive programming
## HTTP headers (CORS, CSP, HSTS, etc.)
## Preventing common security risks – OWASP Top Ten
## Exercise: Identify and fix security issues
## Exercise: Applying some best practices to an Express app
## Further research: Data Replication, Sharding, Caching, CAP Theorem

# Part 3: Error management, Logging and Monitoring
## Introduction to logging
## Logging in Node.js (Pino)
## Introduction to monitoring (Sentry)
## Monitoring in Node.js
## Exercise: Implement logging and monitoring in your marketplace API
## Further research: Sentry, Logstash, Elasticsearch, Prometheus, Grafana, Checkly

# Part 4: Capstone project (1 Peer + 1 STL)
Create a full-stack application with a robust back-end. Ensure it handles user authentication and manages data efficiently.
