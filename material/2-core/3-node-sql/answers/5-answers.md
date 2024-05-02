1. Count all movie titles that have been released between 2005 (inclusive) and 2015 (exclusive).

```sql
SELECT COUNT(*)
FROM movies
WHERE year >= 2005 AND year < 2015; -- or year BETWEEN 2005 AND 2014

-- 116557
```

2. List the names of the 10 oldest people and how many years have passed since they were born in the current year. Do not include people who do not have a birth year.

```sql
-- using strftime('%Y', date('now')) or even 2023 is fine
SELECT name, (DATE('now') - birth) AS years_passed
FROM people
WHERE birth IS NOT NULL
ORDER BY birth ASC -- or ORDER BY years_passed DESC
LIMIT 10;

-- Lucio Anneo Seneca|2019
-- ...
-- Saxo Grammaticus|873
```

3. List all the people who have the first name "Quentin", but they are not "Quentin Tarantino". You can assume that names start with a first name.

```sql
SELECT COUNT(name)
FROM people
WHERE name LIKE 'Quentin %' AND name <> 'Quentin Tarantino';
```

4. Count all the times that Martin Scorsese directed.

```sql
SELECT COUNT(*)
FROM directors
JOIN people ON directors.person_id = people.id
WHERE people.name = 'Martin Scorsese';

-- 36
```

5. List star names and the number of movies they have appeared in of stars that have appeared in at least 300 movies.

```sql
SELECT people.name, COUNT(stars.movie_id) AS movie_count
FROM people
JOIN stars ON people.id = stars.person_id
GROUP BY people.id
HAVING movie_count >= 300
ORDER BY movie_count DESC;

-- Brahmanandam|780
-- Adoor Bhasi|405
-- Eddie Garcia|386
-- Mammootty|358
```

6. List all the movies directed by Frank Darabont and their release years. Order the results by the movie's release year in descending order.

```sql
SELECT movies.title, movies.year
FROM movies
JOIN directors ON movies.id = directors.movie_id
JOIN people ON directors.person_id = people.id
WHERE people.name = 'Frank Darabont'
ORDER BY movies.year DESC;

-- The Mist|2007
-- The Majestic|2001
-- The Green Mile|1999
-- The Shawshank Redemption|1994
```

7. Write a query which lists all movie titles where Scarlett Johansson and Chris Evans starred together.

```sql
-- using IN
SELECT m.title
FROM movies m
WHERE m.id IN (
    SELECT movie_id FROM stars
    WHERE person_id = ( -- possible to use JOIN here but that would be slower
        SELECT id FROM people
        WHERE name = 'Scarlett Johansson'
    )
) AND m.id IN (
    SELECT movie_id FROM stars
    WHERE person_id = (
        SELECT id FROM people
        WHERE name = 'Chris Evans'
    )
);
```

```sql
-- using JOINS - slower
SELECT m.title FROM movies m
JOIN stars s ON m.id = s.movie_id
JOIN people p ON s.person_id = p.id
WHERE p.name = "Chris Evans"
INTERSECT
SELECT m.title FROM movies m
JOIN stars s ON m.id = s.movie_id
JOIN people p ON s.person_id = p.id
WHERE p.name = "Scarlett Johansson";
```

8. List all the movies having a rating above 8.5 that feature a star born after 2005. Order the list by the movie's rating descending order. You shold return the movie title, rating and the star's name. A movie can have multiple stars, which means that a movie can appear multiple times in the result set.

```sql
SELECT m.title, r.rating, p.name
FROM movies m
JOIN ratings r ON m.id = r.movie_id
JOIN stars s ON m.id = s.movie_id
JOIN people p ON s.person_id = p.id
WHERE r.rating > 8.5 AND p.birth > 2005
ORDER BY r.rating DESC;
```

9. Write a Node.js script that reads the local `.env` file to get a `FAVORITE_DIRECTOR` variable and access the movie database. The script should return a list of all movies directed by the favorite director. The list should be ordered by movie rating in descending order. Add a local `.env` file to your project and add the `FAVORITE_DIRECTOR` variable to it.

```js
require('dotenv').config();
const sqlite = require('better-sqlite3');
const db = sqlite('movies.db');

const { FAVORITE_DIRECTOR } = process.env;

// prefer a prepared statement over a template literal
const rows = db.prepare(`
  SELECT movies.title, ratings.rating
  FROM movies
  JOIN directors ON movies.id = directors.movie_id
  JOIN people ON directors.person_id = people.id
  JOIN ratings ON movies.id = ratings.movie_id
  WHERE people.name = ?
  ORDER BY ratings.rating DESC
`).all([FAVORITE_DIRECTOR]);

console.log(rows);
```

10. Barbenheimer. In 2023, Christopher Nolan and Greta Gerwig each released a new movie. These movies already exist in the database, but they have no ratings. Write a single query to add a rating to one of these movies. For these movies, you can assume there is only one movie with the same title and year in the database.

```sql
INSERT INTO ratings (movie_id, rating, votes)
VALUES (
    (SELECT id FROM movies WHERE title = 'Oppenheimer' AND year = 2023),
    8.5, -- this is flexible
    1 -- just as this
);
```

11. Do starting letters correlate with the average movie rating? List movie title starting letters and an average rating associated with them. Ignore non latin uppercase letters.

```sql
-- possible to use UPPER for case-insensitive results
SELECT
    SUBSTR(movies.title, 1, 1) AS starting_letter,
    AVG(ratings.rating) AS average_rating
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE SUBSTR(movies.title, 1, 1) BETWEEN 'A' AND 'Z'
GROUP BY starting_letter
ORDER BY average_rating DESC;

-- W|6.35005714285715
-- ...
-- X|5.79508196721312
```

12. Write a Node.js script that takes a movie title and year as a command-line argument. Print an error message if a movie with the same title and year already exists in the database. If it does not exist, add it to the database. Assert that a year is numeric. Use query parameters. If any query fails, roll back your changes. If all queries succeed, commit your changes and print the new movie ID to the console.

```js
import { Database } from 'better-sqlite3';

const db = new Database('movies.db');
const [title, year] = process.argv.slice(2);

if (isNaN(year)) {
  console.error('Year must be a number.');
  process.exit(1);
}

const movie = db
  .prepare('SELECT * FROM movies WHERE title = ? AND year = ?')
  .get(title, year);

if (movie) {
  console.error('A movie with the same title and year already exists.');
  process.exit(1);
}

const info = db
  .prepare('INSERT INTO movies (title, year) VALUES (?, ?)')
  .run(title, year);

console.log(`New movie added with ID: ${info.lastInsertRowid}`);
```
