Part 3: Data modeling

# Part introduction

In this part, we will work on modeling databases given a set of requirements. We will learn to model database tables and create Entity Relationship Diagrams (ERDs). We will also explore the concept of data normalization and its importance in database design. By the end of this part, you will have created a few ERDs and your first SQL database in Node.js!

# Key learning topics & resources for this part

# Exercises: SQL Zoo (3 hours+)

**[SQL Zoo](https://sqlzoo.net/wiki/SQL_Tutorial)** is an excellent resource for practicing SQL queries. It has plenty of exercises with various table schemas.

We recommend the first 7 (0 through 6) exercises. Try to pace yourself accordingly. If you find some final exercises within a section too tricky, you can skip them and return to them later. It is better to cover the first ~5 exercises in every section than to get through the first few sections completely, including the final few harder exercises, and then run out of time for the remaining sections.

## Exercise: Modeling Instagram database tables (2 hours)

In the CS50 video on SQL, you saw an example of how to model a database table with an ERD (Entity Relationship Diagram). We will practice just that.

To create an ERD, you can:
- use pen and paper,
- use visual drawing tools, such as [Excalidraw](https://excalidraw.com/), [draw.io](https://app.diagrams.net/), [Miro](https://miro.com/) or [Lucidchart](https://www.lucidchart.com/) to model your database tables,
- use a text-based tool, such as [dbdiagram.io](https://dbdiagram.io/).

We will use the latter to find solutions to the exercises. Using text-based tools is a good practice, as the ERD source code can be:
- added to Git and tracked for line-by-line changes, unlike an image,
- used to generate table definitions with AI tools, such as ChatGPT (though, for the moment, we highly recommend manually writing the table definitions).

**Instagram**

In this exercise, we will model a database for a simplified version of Instagram. We will be working with the following entities:
- `User` - a user of the app
- `Post` - a post created by a user
- `Comment` - a comment created by a user on a post
- `Like` - a like created by a user on a post
- `Follower` - a follower relationship between two users (user A follows user B)
- `Message` - a message sent by a user to another user, with a text

Here are the requirements:
- Users should have a username, email, and password. Usernames and emails should be unique.
- Posts consist of an image URL and an optional text caption. Posts should be associated with a user - each post should have a single user as its author.
- Comments consist of a piece of text. Comments should be associated with a user (author) and a post (where a comment was posted).
- Likes should be associated with a user and a post.

Think about which properties should be required and which should be optional. For example, a post should have an image URL, but a caption should be optional. That will help you decide which properties should be `not null`. Also, think about which properties should be unique.

**[Possible solution](https://dbdiagram.io/d/65098fe202bd1c4a5edafb3b)**.

**Note on IDs:** This exercise's ID type (integer vs. UUID) is unimportant. Also, it is possible to add surrogate `id` to all tables, but here, we use composite primary keys for `followers` and `likes` tables. Also, primary keys are automatically set as unique, so we do not need to specify that.

**Note on timestamps:** It is common practice to add `created_at` and `updated_at` timestamps to all (or nearly all) tables. However, we will not do that in this example to keep things simple.

**Note on many-to-many relationships:** Many-to-many relationships can be modeled with 2 many-to-one relationships. For example, users can have many followers and follow many users. While we could express that through a many-to-many relationship, it is often better to express it through a chain of 2 many-to-one relationships, such as `users->followers->users`.

## Exercise: Creating tables (0.5 hours)

Prepare a `create-tables.sql` file, which creates all the tables from the Instagram database modeling exercise. Use the [SQLite documentation](https://www.sqlite.org/datatype3.html) to figure out how to create the tables and their columns.

You can use the `sqlite3` command-line client to try creating tables one by one. Do not use AI or other generative tools to generate the SQL. Familiarize yourself with the syntax and documentation.

## Exercise: Migrating schemas (1.5 hours)

**SQL migrations** are a way to manage changes to a database schema over time. Each migration represents a set of changes to the database schema, such as creating tables, modifying columns, or adding indexes. They allow you to version control your database schema and apply changes in a controlled and repeatable manner.

Migrations often include statements for creating tables, modifying columns, adding indexes, etc. We will try out a few common migration scenarios.

1. Familiarize yourself with the ALTER TABLE statement in [w3schools](https://www.w3schools.com/sql/sql_alter.asp) and [how it can be used in SQLite](https://www.sqlitetutorial.net/sqlite-alter-table/).

We will continue from our previous exercise and try the following:

2. Your users want to be able to respond to comments. Create a file `migration-1.sql`, which would add a new column `reply_comment_id` to your `comments` table, referencing the `id` column of the `comments` table. Should this column be nullable or not?
3. Your application needs a new feature - users should be able to like comments. Create a file `migration-2.sql` to allow you to implement this feature. What would you need to change in your database schema?

## Exercise: Creating tables in Node.js (0.5 hours)

Create a `createTables.js` (or `.ts`) file to create all the tables for your image-sharing website in a new SQLite database. Try to use your existing `create-tables.sql` and `migration—*` files to create the tables and apply table schema changes.

Check that your database has the same tables and columns as in the previous exercise.

# Directions for further research (3 hours+)

- What are the differences between natural and surrogate keys?
- What happens if you try to delete a row referenced by another table using a foreign key?
- When might you consider using a LEFT JOIN over an INNER JOIN in your social media app?
- What are SQLite limitations when using `ALTER TABLE` statements?
- SQLite can run in an "in-memory mode". Why might you want to do that?
- What is data normalization?
