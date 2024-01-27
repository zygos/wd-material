Part 4: NoSQL Databases and MongoDB

# Part introduction

{{ TODO: add intro }}

# Key learning topics & resources for this part

<!--
## Database Design

- {{ TODO: Consider 2x ERD/UML pratimai? }}
-->

## NoSQL databases (1.5 hours)

- Watch: [SQL vs NoSQL](https://www.youtube.com/watch?v=Q5aTUc7c4jg) (10 min)
- Watch: [Introduction to NoSQL](https://www.youtube.com/watch?v=qI_g07C_Q5I) (1 hour)

While we have touched upon the differences between SQL and NoSQL databases in the course, this time we will take a deeper look at the differences between the two. We will also look at the strengths and weaknesses of NoSQL databases, and MongoDB in particular.

## MongoDB (7 hours)

- Read: [MongoDB Strengths and Weaknesses](https://alronz.github.io/Factors-Influencing-NoSQL-Adoption/site/MongoDB/Results/Strengths%20and%20Weaknesses/) (15 min)
- Watch & Read: [MongoDB Node.js Developer Path](https://learn.mongodb.com/learning-paths/mongodb-nodejs-developer-path) (requires a free registration; go up to and including "Insert and Find Documents" section)

While there are many different NoSQL databases, we will focus on MongoDB as it is the most popular NoSQL database that can cover lots of use cases. Other NoSQL databases and database types, such as Redis, Cassandra, etc. are also worth looking into but they have more specific use cases.

MongoDB is a document-oriented NoSQL database. It stores data in flexible, JSON-like documents, meaning fields can vary from document to document and data structure can be changed over time. This makes MongoDB a good choice for storing data that is not well defined, likely to change over time or is easily separated into distinct aggregates.

You will quickly notice that unlike SQL databases, MongoDB uses a JavaScript-like syntax for querying and updating data. This is because MongoDB uses the BSON (Binary JSON) format for storing data, which is a binary-encoded serialization of JSON-like documents. This makes MongoDB a popular choice for Node.js applications as it requires less data transformation.

MongoDB provides an excellent Node.js-specific learning path that covers all the basics of MongoDB. It's a great way to get started with MongoDB and Node.js. Maybe the only downside is that it is based on MongoDB Atlas, which is a cloud-based MongoDB service. However, it's free to use and the concepts are the same when using a self-hosted MongoDB instance and your own IDE.

We will revisit MongoDB later in the course, but for now, we will focus on the basics of MongoDB, so at this point, you can stop after the "Insert and Find Documents" section.

# Directions for further research (1 hour+)

- Review [the MongoDB Experss.js example](https://github.com/mongodb-developer/mongodb-express-rest-api-example/blob/main/server/routes/posts.mjs), how does it differ from what you have learned so far with SQL databases?
Other NoSQL databases, such as Redis, Cassandra, CouchDB, etc.
- TypeORM supports not only SQL databases but also MongoDB. Check out [the TypeORM MongoDB documentation](https://typeorm.io/mongodb). What are the key differences when defining and querying entities?
