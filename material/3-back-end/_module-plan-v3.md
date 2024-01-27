=== Module 3: Back-end development with Node ===

--- Sprint 1: Back-end Fundamentals ---

# Part 1: Back-end servers and Node.js

- Back-end servers and their role
- Back-end server architectures
- Server terminology
- Exercise: Setting up a Node.js server
- Core Node.js Modules
- Setup Node.js project with TypeScript
- Exercise: Reading and writing files with fs
- Further research: Nginx, Apache, SWC

# Part 2: SQL

- Introduction to SQL
- SQLite
- SQL Language Basics and Exercises
- Inserting and querying data
- Relationship types
- Joins
- Foreign keys
- Further research: Indexes, Constraints

# Part 3: Working with relational databases

- Using Diagrams for Data Modeling
- Using SQLite with Node.js
- Exercise: Creating tables
- Exercise: Inserting and updating rows in Node.js
- Normalization
- Further research:

# Part 4: Hands-on: Migrating spreadsheets to a database

A company storing their data in spreadsheets wants to migrate to a database. The task is to parse the CSV file and store the data in a database. The task involves designing a database schema, creating tables, inserting data and querying data.

# Part 5: Peer project – Mock Interview (2 Peer)

Participate in a code review project. Take turns acting as the interviewee and interviewer. Prepare three tasks for review: a take-away exercise, knowledge-testing questions, and a live coding challenge. Focus on SQL.

--- Sprint 2: REST API server ---

Resources:
- https://www.prisma.io/dataguide/intro/what-are-databases

# Part 1: Express.js and REST APIs
- REST APIs
  - Resource: [RESTful APIs and CRUD](https://www.youtube.com/watch?v=lsMQRaeKNDk)
- Express.js
  - Resource: [RESTful APIs in Node](https://www.youtube.com/watch?v=-MTSQjw5DrM)
    - Explains everything through using JavaScript and CommonJS modules, so there is no need to add any configuration or compiling TypeScript
    - For the second part of the video, which discusses how to use Express in Node, follow along the video with your code editor
    - Video uses Insomnia. You can use any GUI REST client, such as Insomnia, Postman, Thunder Client (VS Code extension). You probably have one installed, as you had some exercises using a REST client in the front-end module. Please do not try to download the exact same REST client for every guide you find online. Some tutorials will use Insomnia, some will use Postman, some will use a client inside your editor, such as Thunder Client.
    - Notes on versions
- **Exercise:** Building a simple API endpoint with Express
- Express.js
  - Documentation
  - Handling Requests
  - [Routes](https://expressjs.com/en/guide/routing.html)
  - Middleware
  - Examples
  - Tips & Tricksf
- API design
  - Command Query Responsibility Segregation
- Further research: Templating engines, JSON:API, GraphQL, gRPC, WebSockets, protobuf

# Part 2: CRUD REST APIs with Query builders
- Query builders: Kysely
- Exercise: SQL -> using Kysely
- Exercise: Inserting and querying data in your e-commerce database using Node.js
- Exercise: Updating and deleting data in your e-commerce database using Node.js
- Mention, that pure SQL is rarely used. Why? Typing, Security, auto-migrations, IDE tooling...
- Further research: Planetscale, Neon, RabbitMQ, Redis

# Part 3: Test-Driven Development (TDD)
- Introduction to TDD
- Writing tests before code
- How to write testable code?
- Exercises: Refactor
- Exercise: Vitest
- Red-Green-Refactor cycle in TDD
- Dependency injection
- Mocking in Vitest
- Exercise: Writing tests for a Node.js application

# Part 4: Hands-on: Local CRUD REST API server using TDD

{{ Add a TDD exercise }}

# Part 5: Practical Project – Discord.js Bot (1 Peer + 1 STL)

{{ Add a practical project }}

--- Sprint 3: Full-stack applications ---

# Part 1: PostgreSQL and ORMs

- [1.0] ORMs
- [6.0] TypeORM
  - [TypeORM Crash Course](https://www.youtube.com/watch?v=JaTbzPcyiOE) (2 hours)
  - [Migrations in TypeORM](...)
- PostgreSQL
- [1.0] Postgres: Install and setup
- [0.5] Postgres: Connect to Postgres from Node.js
  - [Connect to PostgreSQL from Node.js](https://www.youtube.com/watch?v=O4bNwkC1ZxA)
- Further research: Data Mapper vs. Active Record, Prisma

Outdated:
  - https://www.youtube.com/watch?v=JfIvPDPUFo4

# Part 2: Monorepo and RPC

- Monorepo (vs. multi-repo/polyrepo)
  - [Monorepo to Multirepo and Back Again](https://www.youtube.com/watch?v=lV8-1S28ycM)
  - Monorepo project setup
  - [Monorepo with NPM Workspaces](https://www.youtube.com/watch?v=4DOBsEGyKF0)
  https://www.youtube.com/watch?v=4CpR-_Nyd00
- tRPC:
  <!-- - https://www.youtube.com/watch?v=S6rcrkbsDI0 (10 min) -->
- Connecting to a back-end from a front-end
- Further research: ...
- Mention: GraphQL, TS-REST

To watch (man):
  - [Typeorm vs Prisma](https://www.youtube.com/watch?v=hAUE-gK80f0)
  - [tRPC API Testing](https://www.youtube.com/watch?v=YRGo1H-qNQs)
  - [tRPC in 45 minutes](https://www.youtube.com/watch?v=UfUbBWIFdJs)
  - [tRPC in 10 minutes](https://www.youtube.com/watch?v=S6rcrkbsDI0)
  - [npm workspaces](https://www.youtube.com/watch?v=4CpR-_Nyd00)

# Part 3: Authentication and Authorization

- Authentication
  - Encryption (bcrypt, scrypt, etc.)
  - Authentication flows (Basic Auth, Sessions, Cookies, JWTs, OAuth)
  - Exercise: Implementing authentication
- Authorization
  - Role-based access control
  - Exercise: Implementing authorization
  - Further research: using 3rd party authentication services, 12-factor app

# Part 4: Hands-on: Full-stack application

- Vue + Express starting template
- Implementing multiple types of authentication:
  - JWT in a cookie + localStorage?
  - OAuth
- E2E TDD + integration test + unit test

# Part 5: Practical Project – Full Stack Application (1 Peer + 1 STL)

Build a marketplace API using Express, PostgreSQL, and authentication.

--- Sprint 4: Containerization & Best practices ---

- 12-factor app

Capstone-focused:
  - first part: specialization start

<!--
# Part 2: Collaborative Development

- Continuous Integration/Continuous Delivery (CI/CD)
- Agile methodologies & Scrum
- Git Flow, GitHub Flow, GitLab Flow, trunk-based development
- GitHub
  - GitHub Actions
  - Exercise: Building your own GitHub Actions workflow
  - Filing and resolving Issues
  - Creating and managing Pull Requests
  - Code Reviews
- Further research: GitLab, Jenkins, Kanban
-->

QUESTION: AWS pricing? Įmanoma, kad kažkas netilps į free tier? Turing College applyint gauti AWS credits?

# Part 1: Basics of CI/CD & Docker

- Resources:
  - [CI/CD and Docker](https://cs50.harvard.edu/web/2020/weeks/7/) (57:15 onwards) (1 hour)
  - [Docker Tutorial for Beginners](https://www.youtube.com/watch?v=pTFZFxd4hOI) - 1 hour


# Build
# Docker
# Nginx
# Docker Compose
# GitHub Actions

## Introduction to Docker
## Creating a Dockerfile and building Docker images
## Creating an image for the back-end
## Running applications inside Docker containers
## Exercise: Containerizing a Node.js application
## Exercise: GitHub Actions Build and Test
## Further research: Kubernetes

Goal: Form a Dockerfile for your application.

# Part 2: Hosting & Cloud Services

- Resources:
  - https://cs50.harvard.edu/web/2020/weeks/7/ (57:10 - 1:19:00)

  - [Build & Deploy Multi-Container Apps to AWS](https://www.youtube.com/watch?v=nhqcecpi47s) ?
## Deployment strategies
## Introduction to Cloud Services and AWS
## Exercise: Connecting to an EC2 instance
  - SSH, SSH keys
## AWS
  - https://www.youtube.com/watch?v=JIbIYCM48to:
    - EC2, RDS, ECR, S3 | Elastic Beanstalk
    > App Runner?
  - 1. Containers
  - 2. Create EC2 instance (Beanstalk?)
  - 3. Create RDS instance
## Exercise: Deploying by hand
  - Front-end: static files
  - Back-end: serve the static files and handle the API requests
## Automated deployments with GitHub Actions
  - Front-end build and test.
  - Back-end build and test.
## Exercise: Deploying containers to AWS using GitHub Actions
  - Git Commit -> GitHub server builds and tests our code -> GitHub server pushes the code to AWS -> EC2 instance kills our previous container and starts a new one.
## Further research: SSL su LetsEncrypt, CDNs (Cloudflare, Cloudfront), Edge computing, Terraform, AWS Budgets. Pridėkit Alerts!
- Kažkas (Google) buvo užmiršę apie SSL, tai site nulūžęs.
- Buy your own domain.
- 90% juniors negalėtų setup'inti projekto su `monorepo` deployments.

Goal: Host your application container on AWS Lightsail.

# Part 3: Error management, Logging, Monitoring, Scalability and Security (theory)

Resources: https://cs50.harvard.edu/web/2020/weeks/8/

https://www.youtube.com/watch?v=866olNIzbrk

## Error management, Logging, Monitoring
## Exercise: Sentry
## Exercise: Logging levels
## Exercise: Logging to file
## Exercise: Logging to Cloudwatch
## Exercise: Monitoring with Checkly

## Fundamentals of web security
## Defensive programming
  - Exercise: Hacker
  - https://google-gruyere.appspot.com/
  - Kitokių hacking playground stuff
  - XSS
## Scalability
  - kaip aktualu?
  - kodėl nereikia per anksti apie tai galvoti?
## HTTP headers (CORS, CSP, HSTS, etc.)
## Preventing common security risks – OWASP Top Ten
## Exercise: Identify and fix security issues
## Exercise: Applying some best practices to an Express app
## Further research: DDOS, Data Replication, Sharding, Caching, CAP Theorem

Goal: Introduce to general good practices that should be followed when developing a web application.
Additional: add more resources.

<!--
# Part 3: Error management, Logging and Monitoring
## Introduction to logging
## Logging in Node.js (Pino)
## Introduction to monitoring (Sentry)
## Monitoring in Node.js
## Exercise: Implement logging and monitoring in your marketplace API
## Further research: Sentry, Logstash, Elasticsearch, Prometheus, Grafana, Checkly
-->

# Part 4: Capstone project (1 Peer + 1 STL)

Create a full-stack application with a robust back-end. Ensure it handles user authentication and manages data efficiently.

---

Hands-on solutions:

- Ką jie turėjo padaryti patys?

---

## Node.js Specializacija

---

- Single Responsibility, Encapsulation, Interface segregation and Design by Contract

--- --- ---

Open Session:

Office hours.

--- Kuo greičiau, tuo geriau. ---

- BE 2. Questions.
- BE 3. Questions.

- 2 x 1 h per week.
- https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/762970113/Open+Sessions

--- --- ---

- 10K. $50 per hour. Stock vesting per metus. Exercised 3 metai po vesting. IPO.
- Long-term team lead kitą mėnesį. 18 - 19 d. 40 val./mėn. Supaprastinus modulį.

--- --- ---

<!-- Solving issues in a GitHub repository -->

<!-- Picking an issue in a shared on a GitHub repository. Collaborating with a peer to solve the issue and create a Pull Request. -->