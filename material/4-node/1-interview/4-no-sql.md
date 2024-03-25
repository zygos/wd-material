Part 4: NoSQL Databases and MongoDB

# Part introduction

Welcome to the final stop before we dive into mock tech interview preparations! We've got an exciting topic to cover that will add a new dimension to your back-end development skills - NoSQL databases, with a particular focus on MongoDB.

Node.js and MongoDB share a special bond - both surged in popularity around the same time and have been playing well together ever since. This synergy has given rise to numerous tech stacks based on Mongo + Node setups, making them a popular duo worth mastering.

### Goals:

- **Understand the differences**: Grasp the fundamental differences between SQL and NoSQL databases, and why choosing the right type matters.
- **Practical application**: Get hands-on experience with MongoDB, especially in Node.js, learning how to insert and find documents effectively.

### Limitations:

- **Focus on MongoDB**: While NoSQL encompasses a variety of databases, our journey here concentrates mainly on MongoDB. Other databases like Redis, Cassandra, and CouchDB have their merits but will be only mentioned in some resources.
- **Basics first**: We're laying the groundwork for MongoDB, so advanced topics and deep technical intricacies might need to be covered in depth.

# Key learning topics & resources for this part

## NoSQL databases (1.5 hours)

- Watch: [SQL vs NoSQL](https://www.youtube.com/watch?v=Q5aTUc7c4jg) (10 min)
- Watch: [Introduction to NoSQL](https://www.youtube.com/watch?v=qI_g07C_Q5I) (1 hour)

While we have touched upon the differences between SQL and NoSQL databases in the course, we will take a deeper look at the differences between the two. We will also look at the strengths and weaknesses of NoSQL databases, particularly MongoDB.

## MongoDB (7 hours)

- Read: [MongoDB Strengths and Weaknesses](https://alronz.github.io/Factors-Influencing-NoSQL-Adoption/site/MongoDB/Results/Strengths%20and%20Weaknesses/) (15 min)
- Watch & Read: [MongoDB Node.js Developer Path](https://learn.mongodb.com/learning-paths/mongodb-nodejs-developer-path) (requires free registration; **go up to and including "Insert and Find Documents" section**)

While there are many different NoSQL databases, we will focus on MongoDB as it is the most popular NoSQL database that can cover lots of use cases. Other NoSQL databases and database types, such as Redis, Cassandra, etc. are also worth looking into but they have more specific use cases.

**MongoDB is a document-oriented NoSQL database**. It stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time. This makes MongoDB a good choice for storing data that is not well defined, likely to change over time or is easily separated into distinct aggregates.

You will quickly notice that MongoDB uses a **JavaScript-like syntax** for querying and updating data. This is because MongoDB uses the BSON (Binary JSON) format for storing data, which is a binary-encoded serialization of JSON-like documents. This makes MongoDB a popular choice for Node.js applications as it requires less data transformation and context-switching.

MongoDB provides an excellent Node.js learning path that covers all the basics of MongoDB. It's a great way to get started with MongoDB and Node.js. Maybe the only downside is that it is based on MongoDB Atlas, a cloud-based MongoDB service. However, it's free to use, and the concepts are the same when using a self-hosted MongoDB instance and your own IDE.

We will focus on the basics of MongoDB for now. So, at this point, **you can stop after the "Insert and Find Documents" section**.

# Directions for further research (2 hours+)

- Review [the MongoDB Experss.js example](https://github.com/mongodb-developer/mongodb-express-rest-api-example/blob/main/server/routes/posts.mjs). How does it differ from what you have learned so far with SQL databases?
Other NoSQL databases, such as Redis, Cassandra, CouchDB, etc.
- TypeORM supports not only SQL databases but also MongoDB. Check out [the TypeORM MongoDB documentation](https://typeorm.io/mongodb). What are the key differences when defining and querying entities?
- MongoDB has its own ecosystem of tools and libraries. Check out Mongoose, a popular ODM (Object-Document Mapper) for MongoDB. How does it compare to TypeORM?
