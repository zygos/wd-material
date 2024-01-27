<!-- SYSTEM -->
Movies database SQL schema:

```sql
CREATE TABLE movies (
    id INTEGER,
    title TEXT NOT NULL,
    year NUMERIC,
    PRIMARY KEY(id)
);
CREATE TABLE stars (
    movie_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id),
    FOREIGN KEY(person_id) REFERENCES people(id)
);
CREATE TABLE directors (
    movie_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id),
    FOREIGN KEY(person_id) REFERENCES people(id)
);
CREATE TABLE ratings (
    movie_id INTEGER NOT NULL,
    rating REAL NOT NULL,
    votes INTEGER NOT NULL,
    FOREIGN KEY(movie_id) REFERENCES movies(id)
);
CREATE TABLE people (
    id INTEGER,
    name TEXT NOT NULL,
    birth NUMERIC,
    PRIMARY KEY(id)
);
```

<!-- USER -->
Task:
"""
Part 5: Peer Mock Interview

## Task description

The task revolves around the [CS50 Movies Problem Set](https://cs50.harvard.edu/x/2023/psets/7/movies/) but with a twist. Instead of just solving the problem set, you will be preparing for a live SQL coding interview on both sides of the table.

You will work with `movies.db`, an SQLite database containing IMDb data about movies, the directors and stars in them, and their ratings. As learners, your goal is to prepare for an SQL live interview and also for the role of an interviewer.

## Preparation

To prepare for the role of an interviewee, follow the steps below:

1. **Investigation:** Follow the general instructions provided in the [CS50 Problem Set](https://cs50.harvard.edu/x/2023/psets/7/movies/) to get a general understanding of the database.
2. **CS50 Questions:** Go through the 13 provided CS50 questions and prepare answers for all questions. Use a locally installed `check50` package to check your queries. You can [install check50](https://cs50.readthedocs.io/projects/check50/en/latest/index.html) on your machine.
3. **Node.js Setup:** Prepare a Node.js environment allowing you to interact with the SQLite database - a minimal setup without any high-level SQL abstractions. Use the `better-sqlite3` package. Use of TypeScript, linters, and other tools is not necessary but is allowed. Make sure you can write and execute queries. This environment can be used for Node.js-related questions and live coding tasks.
4. **Take-home questions:** Prepare answers for the provided Take-home questions.
5. **Prepare as much as you need for your interview:** You should also be able to write queries in a live environment and explain your thought process. Spend as much time as is necessary to feel confident answering the questions and writing queries.
6. **Self-Prepared Questions:** Prepare 12 questions (3 questions for each of the 4 difficulty levels) that mostly (or exclusively) rely on the provided movie database. Questions should resemble questions supplied in the list of additional questions. Prepare answers to these questions. If you expect other learners to answer these questions, you should be able to answer each of these questions yourself.

Your repository should contain all parts of your work.

## Questions

In the context of this project, "questions" include coding tasks, such as writing a query to retrieve a specific result, as well as general questions about SQL and databases.

Questions and live coding tasks should be ordered to be increasingly challenging, with 3 questions for each level of difficulty. Here's the outline of the different difficulty levels and the associated skills and concepts:

1. **1st Level (Lowest Difficulty Level)**
  - Proficiency in executing simple SELECT queries (WHERE, ORDER BY, LIMIT, OFFSET)
  - Arithmetic operators (+, -, *, /)
  - Comparison operators (>, <, =, <>)
  - Logical operators (AND, OR, NOT, IS NULL)
  - LIKE
2. **2nd Level**
  - Using DISTINCT, IN
  - Aggregate functions (SUM, AVG, COUNT, MAX, MIN)
  - JOIN, GROUP BY, HAVING
  - Ability to insert, update, and remove data into a table
3. **3rd Level**
  - Subqueries
  - UNION, INTERSECT
  - LEFT JOIN, self-joins
  - Explaining the difference between LEFT vs. RIGHT, INNER vs. OUTER JOIN
  - Reading SQL files and performing SQLite queries within Node.js
  - Creating new tables, altering an existing table (add a column, rename a column, and other SQLite-permitted operations)
4. **4th Level (Highest Difficulty Level)**
  - Demonstrating which queries can be used to address generic web app features like pagination or search
  - Writing queries with multiple subqueries or a combination of joins and subqueries
  - Performing queries within Node.js and filtering/transforming results
  - Database migrations
  - Transactions

## Take-home questions

Use separate files or folders to store your answers to the following questions. Name each file/folder based on its number.

### 1st Level (Lowest Difficulty Level)
1. Count all movie titles released between 2005 and 2015.
2. Letters from a stoic. List the names of the 10 oldest people and how many years have passed since they were born in the current year. Do not include people who do not have a birth year.
3. List all the people with the first name "Quentin", but who are not "Quentin Tarantino". You can assume that names start with a first name.

### 2nd Level
4. Count all the times that Martin Scorsese directed.
5. List star names and the number of movies they have appeared in (acted). List only the stars that have appeared in at least 300 movies.
6. List all the movies directed by Frank Darabont and their release years. Order the results by the movie's release year in descending order.

### 3rd Level
7. Write a query that lists all movie titles where Scarlett Johansson and Chris Evans starred together.
8. List all the movies rated above 8.5 that feature a star born after 2005. Order the list by the movie's rating in descending order. You should return the movie title, rating, and the star's name. A movie can have multiple stars, which means that a movie can appear multiple times in the result set.
9. Write a Node.js script that reads the local `.env` file to get a `FAVORITE_DIRECTOR` variable and access the movie database. The script should return a list of movies the favorite director directed. The list should be ordered by movie rating in descending order. Add a local `.env` file to your project and add the `FAVORITE_DIRECTOR` variable to it.

### 4th Level (Highest Difficulty Level)
10. Barbenheimer. In 2023, Christopher Nolan and Greta Gerwig each released a new movie. These movies already exist in the database, but they have no ratings. Write a single query to add a rating to one of these movies. For these movies, you can assume there is only one movie with the same title and year in the database.
11. Do starting letters correlate with the average movie rating? List movie title starting letters and an average rating associated with them. Ignore non-Latin and non-uppercase letters.
12. Write a Node.js script that takes a movie title and year as a command-line argument. Print an error message if a movie with the same title and year already exists in the database. If it does not exist, add it to the database. Assert that a year is numeric. Use query parameters. If any query fails, roll back your changes. If all queries succeed, commit your changes and print the new movie ID to the console.
"""

Provide 6 additional questions for the *4th Level** that should test:
  - Demonstrating which queries can be used to address generic web app features like pagination or search
  - Writing queries with multiple subqueries or a combination of joins and subqueries
  - Performing queries within Node.js and filtering/transforming results
  - Database migrations
  - Transactions

The questions should be interesting, answering relevant questions. Use popular and humorous movie references that should be known by a young developer. For each question, provide its answer in SQL.
