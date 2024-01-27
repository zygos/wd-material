### 1st Level (Lowest Difficulty Level)
1. **Select data from a single table.**
  - How many movies were released in 2010?
  - How many people were born in 1980?
  - When was the movie "Finding Nemo" released?
  - When was the movie "Back to the Future" released?

2. **LIKE, logical operators (AND, OR).**
  - List all the people who have "Smith" in their full name and order the results by their name in alphabetical order (A-Z).

  ```sql
  SELECT * FROM people
  WHERE name LIKE '%Smith%'
  ORDER BY name ASC;

  --- 'Evil' Ted Smith
  --- ...
  --- Zoe Selah Smith|
  ```

  - Count the number of movies that have the word "Potter" in their title. It should ignore words such as "Pottery".

  ```sql
  SELECT COUNT(*)
  FROM movies
  WHERE title LIKE '% Potter%'
  OR title LIKE '%Potter %'
  OR title = 'Potter';

  -- 27
  ```

  - Count all the movies released since 1990 and include the substring "Toy" in their title.

  ```sql
  SELECT COUNT(*)
  FROM movies
  WHERE year >= 1990
  AND title LIKE '%Toy%';

  -- 186
  ```

3. **MIN, MAX, arithmetic operators.**
  - What is the maximum number of votes that a movie has received?

  ```sql
  SELECT MAX(votes) FROM ratings;

  -- 2650876
  ```


  - How many years ago was the movie "Inception" released?

  ```sql
  SELECT (2023 - year) as years_ago -- using a dynamic year number is even better
  FROM movies
  WHERE title = 'Inception';

  -- 13 (for 2023)
  ```

  - How old is the youngest person in the database? You can assume their birthday has passed.

  ```sql
  SELECT 2023 - birth
  FROM people
  ORDER BY birth DESC
  LIMIT 1;

  -- 4
  ```

### 2nd Level

4. **Basic joins.**
  - Which movie has the highest number of votes?

  ```sql
  SELECT title
  FROM movies
  JOIN ratings ON movies.id = ratings.movie_id
  ORDER BY ratings.votes DESC
  LIMIT 1;

  -- or a subquery
  SELECT m.title
  FROM movies m
  WHERE m.id = (
    SELECT r.movie_id
    FROM ratings r
    ORDER BY r.votes DESC
    LIMIT 1
  );

  -- The Shawshank Redemption
  ```

  - Who was the director of "The Godfather"? You can assume there is only a single movie with this title.

  ```sql
  SELECT people.name
  FROM directors
  JOIN movies ON directors.movie_id = movies.id
  JOIN people ON directors.person_id = people.id
  WHERE movies.title = 'The Godfather';

  -- Francis Ford Coppola
  ```

  - We're trying to remember the name of an actress who played in "Titanic", and we know that her first name is Kate. Can you find her full name? (Alternative question: "Die Hard" / Bruce)

  ```sql
  SELECT p.name
  FROM people p
  JOIN stars s ON p.id = s.person_id
  JOIN movies m ON s.movie_id = m.id
  WHERE m.title = 'Titanic' AND p.name LIKE 'Kate%';
  -- Kate Winslet
  ```

5. **Grouping and aggregations.**
  - Who has directed the most number of movies: Steven Spielberg or Martin Scorsese? List the number of movies each director has directed. Order the results by the number of movies in descending order.

  ```sql
  SELECT p.name, COUNT(d.movie_id) as movie_count
  FROM people p
  JOIN directors d ON p.id = d.person_id
  WHERE p.name IN ('Steven Spielberg', 'Martin Scorsese')
  GROUP BY p.id
  ORDER BY movie_count DESC;
  -- Martin Scorsese|36
  -- Steven Spielberg|35
  ```

  - What's the average rating of movies released in the year 2000?

  ```sql
  SELECT AVG(rating)
  FROM ratings
  JOIN movies ON ratings.movie_id = movies.id
  WHERE movies.year = 2000;
  -- 6.05640386413212
  ```

  - How many movies were released each year in the 21st century? List the year and the number of movies released in each year. Order the results by the year in ascending order. What is the general observed trend?

  ```sql
  SELECT year, COUNT(*) AS num_movies
  FROM movies
  WHERE year >= 2000
  GROUP BY year
  ORDER BY year;
  ```

  - They don't make them as they used to... or do they? List average movie ratings by year, ordered by year in ascending order.

  ```sql
  SELECT m.year, AVG(r.rating) as average_rating
  FROM movies m
  JOIN ratings r ON m.id = r.movie_id
  GROUP BY m.year
  ORDER BY m.year ASC;
  -- 1970|6.02368164062499
  -- ...
  ```

6. **Inserting, updating.**

  - The movie 'Dune: Part Two' has been delayed from year 2023 to 2024. Update the database to represent this fact. You can assume there is only a single movie with this title.

  ```sql
  UPDATE movies
  SET year = 2024
  WHERE title = 'Dune: Part Two';
  ```

  - Insert an upcoming movie to the database: "Captain America: Brave New World".

  ```sql
  INSERT INTO movies (title, year)
  VALUES ('Captain America: Brave New World', 2024);
  ```

  - You have hacked into the production database. You want to update your favorite movie rating by 0.2, but you can perform only a sigle UPDATE query before your connection to the server drops. You can not make any assumptions about its movie id or current rating. What query would you run?

  ```sql
  UPDATE ratings
  SET rating = rating + 0.2
  WHERE movie_id = (SELECT id FROM movies WHERE title = 'The Shawshank Redemption');

  -- then ask to revert the change by performing an opposite update
  ```

### 3rd Level

7. **Multiple joins**

  - What is the title and release year of the most recently released movie that Emma Watson starred in? You can assume they released only a single movie that year.
  Alternative: Keanu Reeves

  ```sql
  SELECT title, year
  FROM movies
  JOIN stars ON movies.id = stars.movie_id
  JOIN people ON stars.person_id = people.id
  WHERE people.name = 'Emma Watson'
  ORDER BY movies.year DESC
  LIMIT 1;

  -- (Emma Watson:) Little Women|2019
  -- (Keanu Reeves:) John Wick: Chapter 4|2023
  ```

  - Find the title and rating of a movie directed by Stanley Kubrick with the lowest rating.

  ```sql
  SELECT m.title, MIN(r.rating)
  FROM movies m
  JOIN directors d ON m.id = d.movie_id
  JOIN people p ON d.person_id = p.id
  JOIN ratings r ON m.id = r.movie_id
  WHERE p.name = 'Stanley Kubrick';
  -- Eyes Wide Shut|7.5
  ```

  - List all the directors' names that have directed a movie with a rating of 9.0 or above. Count only movies that have at least 10,000 votes.

  ```sql
  SELECT DISTINCT(name)
  FROM people
  JOIN directors ON people.id = directors.person_id
  JOIN movies ON directors.movie_id = movies.id
  JOIN ratings ON movies.id = ratings.movie_id
  WHERE ratings.rating >= 9.0 AND ratings.votes >= 10000;

  -- Francis Ford Coppola
  -- Steven Spielberg
  -- Frank Darabont
  -- Peter Jackson
  -- Ertem Egilmez
  -- Christopher Nolan
  -- Haruo Sotozaki
  -- Murat Dündar
  -- Amitabh Reza Chowdhury
  ```

8. **Subqueries.**

- List all movies having the lowest rating in the database. Do not make any assumptions on what the lowest rating is.

```sql
SELECT movies.title, ratings.rating
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE ratings.rating = (SELECT MIN(rating) FROM ratings);

-- Steckler Interviews|1.0
-- ...
-- 13 Needles|1.0
```

- Find the names of the stars who have acted in the movies "Inception" and "The Dark Knight".

```sql
SELECT people.name FROM people
WHERE id IN (
  SELECT person_id FROM stars
  WHERE movie_id IN (
    SELECT id FROM movies
    WHERE title IN ('Inception', 'The Dark Knight')
  )
);

-- Leonardo DiCaprio
-- Christian Bale
-- Michael Caine
-- Aaron Eckhart
-- Heath Ledger
-- Joseph Gordon-Levitt
-- Elliot Page
-- Ken Watanabe
```

- Using a subquery, list all the movies titles that both Angelina Jolie and Brad Pitt have starred in together.

```sql
-- Using subqueries
SELECT title
FROM movies
WHERE id IN (
  SELECT movie_id
  FROM stars
  WHERE person_id IN (
    SELECT id
    FROM people
    WHERE name IN ('Angelina Jolie', 'Brad Pitt')
  )
  GROUP BY movie_id
  HAVING COUNT(movie_id) = 2
);
-- Brad Pitt: Breaking Hollywood
-- Brangelina: The Inside Story
-- By the Sea
-- Mr. & Mrs. Smith

-- The Perfect Score
-- The Avengers
-- Captain America: The Winter Soldier
-- Captain America: Civil War
-- The Avengers Assemble Premiere

-- Alternative, using a subquery with joins
SELECT title
FROM movies
WHERE id IN (
  SELECT movie_id
  FROM movies
  JOIN stars ON movies.id = stars.movie_id
  JOIN people ON stars.person_id = people.id
  WHERE people.name IN ('Angelina Jolie', 'Brad Pitt')
  GROUP BY movie_id
  HAVING COUNT(movie_id) = 2
);
```

```sql
-- Alternative using multiple IN clauses
-- using IN
SELECT m.title
FROM movies m
WHERE m.id IN (
  SELECT movie_id FROM stars
  WHERE person_id = ( -- possible to use JOIN here but that would be slower
    SELECT id FROM people
    WHERE name = 'Angelina Jolie'
  )
) AND m.id IN (
  SELECT movie_id FROM stars
  WHERE person_id = (
    SELECT id FROM people
    WHERE name = 'Brad Pitt'
  )
);
```

```sql
-- Alternative without using subqueries, only JOIN + INTERSECT
-- using JOINS - slower
SELECT m.title FROM movies m
JOIN stars s ON m.id = s.movie_id
JOIN people p ON s.person_id = p.id
WHERE p.name = 'Angelina Jolie'
INTERSECT
SELECT m.title FROM movies m
JOIN stars s ON m.id = s.movie_id
JOIN people p ON s.person_id = p.id
WHERE p.name = 'Brad Pitt';
```

9. **Theoretical question**
  - **What is the difference between LEFT vs. RIGHT JOIN?**
  A: The difference between LEFT and RIGHT JOIN is the order of the tables. LEFT JOIN returns all the records from the left table, and matched records from the right table. RIGHT JOIN returns all records from the right table, and the matched records from the left table. SQLite does not support RIGHT JOIN, but you can use LEFT JOIN instead.

  - **What is the difference between INNER vs. OUTER JOIN?**
  A: INNER JOIN gets the records that have matching values in both tables. OUTER JOIN gets all records when there is a match in either the left or the right table.

  - **What is the difference between WHERE vs. HAVING?**
  A: WHERE filters the records before the GROUP BY clause is applied. HAVING filters the records after the GROUP BY clause is applied.

  - **What is the purpose of database migrations?**
  A: Database migrations are used to manage changes in the database schema that evolve over time as the application requirements change. They allow a source version of the database to be transformed into a target version, making it possible to synchronize the database design with the corresponding application code. This includes creating new tables, altering existing tables, adding or modifying data, etc.

  Migrations also help in maintaining consistency across different environments (development, testing, production) by ensuring that the same database changes are applied across all environments. They also provide a version control for the database schema, making it possible to roll back changes if needed.

### 4th Level (Highest Difficulty Level)

  - The database does not include movies released before 1970. Write a Node.js script that performs a transaction that inserts the 1957 classic "12 Angry Men", associates it with director Sidney Lumet, and adds a 9.0 rating with 834,000 votes. You can assume that there is only a single person named Sidney Lumet. If there is an error, you should rollback your transaction.

```js
import Database from 'better-sqlite3';

const db = new Database('movies.db');

const directorName = 'Sidney Lumet';

const movie = {
  title: '12 Angry Men',
  year: 1957,
};

const rating = {
  rating: 9,
  votes: 834000,
};

const insertMovie = db.transaction((movie, rating, director) => {
  const { id: movieId } = db
    .prepare('INSERT INTO movies (title, year) VALUES (?, ?) RETURNING id')
    .get(movie.title, movie.year);

  db.prepare('INSERT INTO directors (movie_id, person_id) VALUES (?, ?)')
    .run(movieId, director.id);

  db.prepare('INSERT INTO ratings (movie_id, rating, votes) VALUES (?, ?, ?)')
    .run(movieId, rating.rating, rating.votes);

  return movieId;
});

const director = db
  .prepare('SELECT id FROM people WHERE name = ?')
  .get(directorName);

const movieId = insertMovie(movie, rating, director);

console.log('New movie id:', movieId);
```

  - Write a Node.js script that reads the local `.env` file to get a `FAVORITE_STAR` variable and access the movie database. The script should return a list of movies the favorite star acted in, in the form of a table.
  Hint: `console.table`.

  ```js
  // quite self-evident
  ```

  - Write a Node.js script that creates a table called "genres". Propose a reasonable table schema. Would you need to create any other tables? What kind of relationships would exist between these tables?

  ```sql
  CREATE TABLE (
    -- learner's proposed schema
  );
  ```

  - Write a Node.js script that returns the total number of movies directed by a given director and the average rating of these movies. Your query should use a query parameter.

  ```sql
  -- Node.js script containting something of the sort:
  SELECT COUNT(*), AVG(r.rating)
  FROM directors d
  JOIN movies m ON m.id = d.movie_id
  JOIN ratings r ON r.movie_id = m.id
  WHERE d.person_id = (
    SELECT id FROM people WHERE name = ?
  )
  GROUP BY d.person_id;
  ```

  - Write a Node.js script that searches for movies containing a specific term in the title and returns them in batches of 10 movies. The script accepts 2 arguments: the query and the page number (starting from 1). The movies should be returned ordered by their rating in descending order. For example: `node search.js star 1` should return the first 10 movies that include "star" in their name.

  ```sql
  -- Node.js script containing pagination, such as:
  -- example using an offset
  SELECT *
  FROM movies
  WHERE title LIKE ?
  ORDER BY rating DESC
  LIMIT 10 OFFSET ?;
  ```

  Follow up: What are the alternative approaches of implementing pagination in an web application back-end and how would that work? (cursor-based pagination by using a provided id in the WHERE clause).
