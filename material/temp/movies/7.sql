SELECT movies.title, AVG(ratings.rating) AS rating
FROM movies
LEFT JOIN ratings ON movies.id = ratings.movie_id
WHERE movies.year = 2010
  AND ratings.rating IS NOT NULL
GROUP BY movies.id
ORDER BY rating DESC, movies.title ASC;