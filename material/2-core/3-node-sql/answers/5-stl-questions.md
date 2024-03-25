??. Write a query to list the top 5 oldest movies in the database.

??. Write a query to find out how many movies were released in the year 2000.

??. Write a query to list the top 10 movies that received the highest number of votes.

```sql
SELECT m.title
FROM movies m
JOIN ratings r ON m.id = r.movie_id
ORDER BY r.votes DESC
LIMIT 10;

-- The Shawshank Redemption
```

??. Write a SQL query to find the names of all people who starred in "Avengers: Endgame".

??. Write a SQL query to list the top-rated movie of each year from 2010 to 2020.

??. Write a SQL query to find the stars who have worked with the highest number of different directors. Display star's name and director count.

```sql
SELECT p.name, COUNT(DISTINCT d.person_id) as director_count
FROM stars s
JOIN people p ON s.person_id = p.id
JOIN directors d ON s.movie_id = d.movie_id
GROUP BY p.name
ORDER BY director_count DESC
LIMIT 1;
```

??. Implement a function in Node.js that takes a person's name as input and returns the titles of all movies in which they have starred.


??. Are movies getting better or worse? Write a SQL query to find the average rating of all movies by year and the total number of votes for all movies in the same year. Order years by descending order.

```sql
SELECT m.year, AVG(r.rating) as average_rating, SUM(r.votes) as total_votes
FROM movies m
JOIN ratings r ON m.id = r.movie_id
GROUP BY m.year
ORDER BY m.year DESC;
```

??. Write a query that outputs the director who had the highest average rating for their movies in the 2000s.

??. Write a Node.js script that allows the user to search for a movie by title, and returns its details in JSON if it exists in the database.

??. Write a query to find out the total number of votes received by movies directed by Steven Spielberg.

??. Highly rated movies. Write a query to find the top 10 actors that star in highly rated movies (rating > 8.5) with over 1,000,000 votes. Return the actor's name and the number of highly rated movies they starred in.

```sql
SELECT p.name, COUNT(*) highly_rated_movies
FROM people p
JOIN stars s ON p.id = s.person_id
JOIN movies m ON s.movie_id = m.id
JOIN ratings r ON m.id = r.movie_id
WHERE r.rating >= 8.5
AND r.votes > 1000000
GROUP BY p.name
ORDER BY highly_rated_movies DESC
LIMIT 10;
```

??. Write a SQL query to find out which movie has the highest rating in each year, and provide the year, movie title, and rating. Ignore movies that have less than 40,000 votes.

```sql
SELECT year, title, MAX(rating)
FROM movies
JOIN ratings ON movies.id = ratings.movie_id
WHERE votes >= 40000
GROUP BY year
ORDER BY year DESC;
```
