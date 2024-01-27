Architectures in an order of increasing complexity (all with TypeScript):

1. **Serverless**
  - Lecture 1: Node.js
  - Lecture 2: TDD
  - Lecture 3: Hosting
  - Hands-on: Deploying a serverless function to AWS Lambda
  - Project: Peer Interview

2. **REST API server**
  - Lecture 1: Express.js
  - Lecture 2: Data modeling & SQL basics
  - Lecture 3: SQL in Node.js
  - Hands-on: Syncing CSV data to a database
  - Project: Full CRUD API with a Database:
    - Design a database schema for a blog website
    - REST CRUD API with Express.js
    - PostgreSQL on the same machine

3. **Server on a cloud-service**
  - Lecture 1: Cloud services & CI/CD
  - Lecture 2: Authentication, Authorization and Security
  - Lecture 3: Collaborative Development
  - Hands-on: Solving issues in a GitHub repository
  - Project:
    - Full Stack Application
    - Build a marketplace API using Express, PostgreSQL, and authentication.
    - AWS EC2 instance

4. **Containerization**
  - Lecture 1: Containers & Docker
  - Lecture 2: Scalablity
  - Lecture 3: Error management, Logging and Monitoring
  - Project: **Capstone**

---

1. **Serverless**
  - Lecture 1: Basics of Back-end Development
    - Back-end servers and their role, examples from real-world applications
    - Back-end server architectures
    - Server terminology
    - Setting up a Node.js server, with use-cases from real-world scenarios
    - Core Node.js Modules
    - Reading and writing files with fs in real-world situations
    - Debugging a Node application
    - Rate limiting in a Node.js application
    - Further research: Nginx, Apache
  - Lecture 2: Test-Driven Development (TDD)
    - Introduction to TDD
    - Writing tests before code
    - The Red-Green-Refactor cycle in TDD
    - Mocking in Vitest
    - Writing tests for a Node.js application
  - Lecture 3: Serverless Architecture 
    - Introduction to Serverless Architecture
    - Basics of AWS Lambda
    - Deploying a serverless function to AWS Lambda
  - Hands-on: Deploying a serverless function to AWS Lambda
  - Project: Peer Interview

2. **REST API server**
  - Lecture 1: Express.js and REST APIs
    - REST APIs with real-world examples
    - API design
    - Introduction to Express.js
    - Routes and Middleware
    - Building a simple API endpoint with Express
    - Further research: GraphQL, gRPC, WebSockets
  - Lecture 2: Data Modeling & SQL Basics
    - Using Diagrams for Data Modeling
    - Data relationships
    - UML
    - Creating a UML diagram to model data for an e-commerce website
    - Database Types (SQL vs NoSQL)
    - Introduction to SQL
    - Creating an e-commerce database and tables
  - Lecture 3: SQL in Node.js
    - Connecting to a Postgres database
    - SQL in Node.js
    - Query builders: Kysely
    - Inserting and querying data in your e-commerce database using Node.js
  - Hands-on: Syncing CSV data to a database
  - Project: Full CRUD API with a Database:
    - Design a database schema for a blog website
    - REST CRUD API with Express.js
    - PostgreSQL on the same machine

3. **Server on a cloud-service**
  - Lecture 1: Cloud services & CI/CD
    - Server types (Serverless, SOA, Microservices, Monolith)
    - Introduction to Cloud Services with AWS
    - Creating serverless functions with AWS Lambda
    - Deploying applications on AWS EC2
    - SSH and SSH keys
    - Deploying applications to AWS using GitHub Actions and containers
  - Lecture 2: Authentication, Authorization and Security
    - Fundamentals of web security
    - Sanitization and Validation
    - Data validation with zod
    - Encryption (bcrypt, scrypt, etc.)
    - Authentication
    - Authentication flows (Basic Auth, Sessions, Cookies, JWTs, OAuth)
    - Implementing authentication in your e-commerce API
    - Implementing authorization in your e-commerce API
  - Lecture 3: Collaborative Development
    - Git Flow, GitHub Flow, GitLab Flow, trunk-based development
    - Creating and managing Pull Requests
    - Filing and resolving Issues
    - Continuous Integration/Continuous Delivery (CI/CD)
    - Bash Scripting for CI/CD, GitHub Actions
    - Building your own GitHub Actions workflow
  - Hands-on: Solving issues in a GitHub repository
  - Project: Full Stack Application (Build a marketplace API using Express, PostgreSQL, and authentication.)

4. **Containerization**
  - Lecture 1: Containers & Docker
    - Introduction to Docker
    - Creating a Dockerfile and building Docker images
    - Running applications inside Docker containers
    - Building and running a Docker image of your marketplace API
    - Further research: Kubernetes, Docker Compose
  - Lecture 2: Scalability
    - Understanding scalability
    - Scaling databases: Data Replication, Sharding, Caching, CAP Theorem
    - Further research: CDNs, Edge computing, Terraform
  - Lecture 3: Error management, Logging and Monitoring
    - Introduction to logging
    - Logging in Node.js (Pino)
    - Introduction to monitoring (Sentry)
    - Monitoring in Node.js
    - Implementing logging and monitoring in your marketplace API
    - Further research: Sentry, Logstash, Elasticsearch, Prometheus, Grafana, Checkly
  - Project: Capstone
    - Create a full-stack application with a robust back-end. Ensure it handles user authentication and manages data efficiently.