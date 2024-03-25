Write a new task for the an SQL practice and live SQL interview. The task is based around CS50 Movies SQL exercise.

Students will be provided with the IMDB movies SQLite database beforehand ( https://cdn.cs50.net/2022/fall/psets/7/movies.zip ). Their task will be to:
1. prepare for an SQL interview
2. prepare for interviewing their peer

Every student will have 2 sessions on SQL where they are the interviewee - in an interview by a peer and an interview by a Senior Team Lead (STL).
Also, most students will have at least 1 session where they are the interviewer.

To prepare for an interviewee, they will need to:
1. Investigate the provided database.
2. Prepare an ERD for the database in their preferred format.
3. Go through the provided CS50 questions and prepare answers for all questions. Learner can use a locally installed `check50` package.
4. Prepare a Node.js environment which would allow them to interact with the database - a minimal setup without any high-level SQL abstractions.
5. Prepare answers for the following list of questions:
```
{{ Add an additional list of questions - take-home queries }}
```
6. Prepare 12 questions (3 questions for each of the 4 difficulty levels) that would mostly (or exclusively) rely on the provided movies database. Questions should resemble questions provided in CS50 question list and the provided list of additional question. Prepare answers for these questions. You should be able to answer each of these questions in a live environment in a matter of minutes. These questions will prepare you for your own interview.

Before an interview where you take up the interviewer role:
1. Check the provided database ERD.
2. Check the provided answers for the CS50 problem set. Learner can use a locally installed `check50` package.
3. Check the answers for the take-home questions.

The exercise should demand queries in an increasing order of difficulty. Difficulty levels (% of final mark):
- take-home queries and ERD
- 1st level
  - Simple SELECT queries
  - arithmetic operators (+, -, *, /)
  - comparison operators (>, <, =, <>)
  - logical operators (AND, OR, NOT)
- 2nd level
  - queries with DISTINCT
  - queries with LEFT JOIN, GROUP BY, HAVING
  - queries with aggregations (SUM, AVG, COUNT, MAX, MIN)
  - ability to insert, update and remove data
- 3rd level
  - queries with multiple joins and/or self-join
  - ability to explain and demonstrate the difference between LEFT vs RIGHT, INNER vs OUTER JOIN
  - ability to alter an existing table (add column, rename column)
  - constructing a query that uses a subquery
  - ability to read SQL files and perform SQLite queries within Node.js
- 4th level
  - ability to suggest queries that would be used to solve generic web app problems (pagination, search)
  - queries with multiple subqueries or a combination of joins and subqueries
  - ability to propose a database changes for suggested features
  - ability to perform queries within Node.js and to filter/transform results

Some of the learner's mark will depend on the general soft skills, such as manner of communication, reaction to provided feedback and other non-tangibles that can make substantial a difference in a real person-to-person interview.

Interviewees will be able to use a Google, Bing, DuckDuckGo, Stack Overflow and other non-AI search engines to help them fill-in gaps in technical questions. Repeated use of a search engine (3+ times) results in a mark reduction. If the interviewee gets completely stuck, interviewer can provide hints or permi the use AI-assistance for a given question, though that would result in minimal marks (if any) for that particular question.

Follow the general structure from the template. Write in detail