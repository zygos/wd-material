Part 5: Peer Mock Interview

## Task description

The task revolves around the [CS50 Movies Problem Set](https://cs50.harvard.edu/x/2023/psets/7/movies/) but with a twist. Instead of just solving the problem set, you will be preparing for a live SQL coding interview on both sides of the table.

You will work with `movies.db`, an SQLite database containing IMDb data about movies, their directors and stars, and their ratings. As learners, your goal is to prepare for an SQL live interview and also for the role of an interviewer.

## Preparation

To prepare for the role of an interviewee, follow the steps below:

1. **Investigation:** Follow the general instructions provided in the [CS50 Problem Set](https://cs50.harvard.edu/x/2023/psets/7/movies/) to get a general understanding of the database.
2. **CS50 Questions:** Go through the 13 provided CS50 questions and prepare answers for all questions. Use a locally installed `check50` package to check your queries. You can [install check50](https://cs50.readthedocs.io/projects/check50/en/latest/index.html) on your machine.
3. **SQL and Node.js Setup:** Prepare some environment where you can run SQL queries comfortably. That can be a GUI tool of your choice, sqlite3 in the command line, or some VS Code extension. For a possible Node.js question, prepare a Node.js environment that allows you to interact with the SQLite database—a minimal setup without any high-level SQL abstractions. Use the `better-sqlite3` package. Make sure you can write and execute queries.
4. **Take-home questions:** Prepare answers for the provided Take-home questions.
5. **Prepare as much as you need for your interview:** You should also be able to write queries in a live environment and explain your thought process. Spend as much time as is necessary to feel confident answering the questions and writing queries.
6. **Self-Prepared Questions:** Prepare 12 questions (3 questions for each of the 4 difficulty levels) that mostly (or exclusively) rely on the provided movie database. The questions should resemble those supplied in the list of additional questions. **Prepare and commit answers to these questions**. If you expect other learners to answer these questions, you should be able to answer each of these questions yourself.

Your repository should contain all parts of your work.

## Questions

In the context of this project, "questions" include coding tasks, such as writing a query to retrieve a specific result, as well as general questions about SQL and databases.

Questions and live coding tasks should be ordered to be increasingly challenging, with three questions for each level of difficulty. Here's the outline of the different difficulty levels and the associated skills and concepts:

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
1. Count all movie titles that have been released between 2005 (inclusive) and 2015 (exclusive).
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

## Reviewer role

### As an interviewer, you will need to:

Before the interview:

- Make sure that the learner has solutions to CS50.
- Check the answers to the take-home questions.
- Check that the learner's prepared list of questions and answers for their interview roughly match the same challenge level as the provided questions.

During the interview:

- ~ 5 minutes. If you have comments on learner's take-home solutions, **ask them to show 1 - 3 solutions**. If any answers are incorrect, comment on the issues. Ask the learner for possible improvements/alternative solutions if the queries are correct.
- 30 - 40 minutes. **Ask questions from the list of self-prepared questions.** This is the central part of the interview. Ask the learner to answer 4 - 5 questions (4 coding questions + 1 theoretical question) using SQLite and Node.js. If the learner cannot proceed, ask them to explain their thought process and provide necessary hints.
- 0 - 5 minutes. **Present your comments** (if any) on the learner's prepared questions/answers. If the learner's questions are too easy or difficult, ask the learner to adjust them. Incorrect answers or out-of-order question difficulty results in penalties.

The interviewer's goal is to ensure the learner can answer questions and write queries in a live environment. **Depending on the learner's level, you can choose the number and order of questions and tasks.** For example, you could ask a single question in the 1st level, then the 2nd level, and if a learner struggles, you can have a different 2nd-level question to give a second chance. However, that most likely means that the student will not reach the final question and thus will not receive full points.

STLs must review [an additional document](https://docs.google.com/document/d/1ThNlcm5DnnQke9Y0g_xFxTLiPA0uP21ZvpkJdirozZA/edit?usp=sharing) on suggested questions and answers.

### As an interviewee, you will need to:

1. **Present solutions to CS50:** Display that your solutions pass the `check50` (`check50 cs50/problems/2023/x/movies`).
2. **Present answers to additional take-home questions.** The interviewer will ask you to show some of the queries and their results. Above all of your queries, provide the given question/task as a comment.
3. **Answer questions from the interviewer:** The interviewer will ask questions from the list of self-prepared questions. You will need to answer them in a live environment.
4. **Present your list of questions and answers.** You must present your list of questions and answers to the interviewer. The interviewer will check that the questions and answers are roughly at the same level as the provided questions to ensure you are prepared to lead an interview.

Before the interview, get a clean copy of the database. It will be used to run your queries and check the results.

## Project evaluation criteria

The performance of the learner will be evaluated based on 4 criteria:

- **Take-home exercises:** How well the learner has answered the provided take-home questions.
- **Live coding and questions:** How well the learner has answered the questions asked by the interviewer.
- **Prepared questions:** Learner's prepared list of questions and the answers they would use in their interview.
- **Soft skills:** Learner's ability to communicate clearly, take feedback, and other intangible skills that can make a substantial difference in a real interview scenario.

Interviewees can use Google, Bing, DuckDuckGo, Stack Overflow, and other non-AI search engines to help them fill in gaps in technical questions that do not directly answer the question. Using a search engine repeatedly or for a prolonged period results in a **reduction in marks**. If the interviewee gets stuck, the interviewer can provide hints or allow AI assistance for a given question. However, that would result in minimal marks (if any) for that question.

# Submission

This project will require 1 STL and 1 Peer review.

To perform a peer review, **you need to have received a peer review from an STL or another learner first**. If a learner has already led a peer review, they should prioritize letting other learners lead a peer review.

**Do not perform a peer review for the same person that led a peer review for you.** This leads to a conflict of interest where learners are incentivized to reciprocate a good grade.

If a learner needs to carry out multiple reviews due to the limited availability of other learners, they should slightly adapt their questions so they are different between sessions.

To practice Git, you are advised to use the command line to submit the project to the Turing GitHub repository.

Read an in-depth guide about reviews here: https://turingcollege.atlassian.net/wiki/spaces/DLG/pages/537395951/Peer+expert+reviews+corrections

**Estimate average time to complete: 25 hours**
