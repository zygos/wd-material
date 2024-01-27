-- SELECT p.name, m.title
-- FROM people p
-- INNER JOIN stars s ON p.id = s.person_id
-- INNER JOIN movies m ON s.movie_id = m.id
-- INNER JOIN ratings r ON m.id = r.movie_id
-- WHERE p.birth > 2005 AND r.rating > 8.5
-- ORDER BY p.birth DESC, p.name ASC;

-- SELECT p.name, r.rating, m.title
-- FROM people p
-- JOIN stars s ON p.id = s.person_id
-- JOIN movies m ON s.movie_id = m.id
-- JOIN ratings r ON m.id = r.movie_id
-- WHERE p.birth > 2005 AND r.rating > 8.5
-- ORDER BY p.birth DESC, p.name ASC;

-- SELECT m.title, r.rating, p.name
-- FROM movies m
-- JOIN ratings r ON m.id = r.movie_id
-- JOIN stars s ON m.id = s.movie_id
-- JOIN people p ON s.person_id = p.id
-- WHERE r.rating > 8.5 AND p.birth > 2005
-- ORDER BY r.rating DESC;

-- SELECT m.title, p.name
-- FROM stars s
-- JOIN directors d ON s.movie_id = d.movie_id AND s.person_id = d.person_id
-- JOIN movies m ON m.id = s.movie_id
-- JOIN people p ON p.id = s.person_id;

-- SELECT m.title
-- FROM movies m
-- JOIN stars s ON m.id = s.movie_id
-- JOIN people p ON s.person_id = p.id;

-- SELECT movies.title, ps.name
-- FROM movies
-- JOIN stars ON movies.id = stars.movie_id
-- JOIN people ps ON stars.person_id = ps.id
-- WHERE ps.name = 'Quentin Tarantino';

-- most Scarlett Johansson co-stars
-- SELECT p1.name
-- FROM people p1 JOIN
--     (SELECT s.person_id, COUNT(s.movie_id) AS movie_count
--     FROM stars s JOIN people p2 ON s.person_id = p2.id
--     WHERE s.movie_id IN
--         (SELECT s1.movie_id
--         FROM stars s1 JOIN people p3 ON s1.person_id = p3.id
--         WHERE p3.name = 'Scarlett Johansson')
--     GROUP BY s.person_id
--     ORDER BY movie_count DESC
--     LIMIT 2) ON p1.id = person_id;

-- Captain America: The Winter Soldier
-- The Perfect Score

-- SELECT m.title FROM movies m
-- JOIN stars s ON m.id = s.movie_id
-- JOIN people p ON s.person_id = p.id
-- WHERE p.name = "Chris Evans"
-- INTERSECT
-- SELECT m.title FROM movies m
-- JOIN stars s ON m.id = s.movie_id
-- JOIN people p ON s.person_id = p.id
-- WHERE p.name = "Scarlett Johansson";

-- SELECT m.title
-- FROM movies m
-- WHERE id IN (
--   SELECT m.id FROM movies m
--   JOIN stars s ON m.id = s.movie_id
--   JOIN people p ON s.person_id = p.id
--   WHERE p.name = "Chris Evans"
--   INTERSECT
--   SELECT m.id FROM movies m
--   JOIN stars s ON m.id = s.movie_id
--   JOIN people p ON s.person_id = p.id
--   WHERE p.name = "Scarlett Johansson"
-- );

-- Avengers: Age of Ultron
-- Avengers: Infinity War
-- Avengers: Endgame

-- SELECT m.title
-- FROM movies m
-- WHERE m.id IN (
--     SELECT movie_id FROM stars
--     WHERE person_id = (
--         SELECT id FROM people
--         WHERE name = 'Scarlett Johansson'
--     )
-- ) AND m.id IN (
--     SELECT movie_id FROM stars
--     WHERE person_id = (
--         SELECT id FROM people
--         WHERE name = 'Chris Evans'
--     )
-- );

-- WITH
--     AvgRating AS (
--         SELECT AVG(rating) as avg_rating
--         FROM ratings
--     ),
--     MedianRating AS (
--         SELECT AVG(rating) as median_rating
--         FROM (
--             SELECT rating
--             FROM ratings
--             ORDER BY rating
--             LIMIT 2 - (SELECT COUNT(*) FROM ratings) % 2    -- odd 1, even 2
--             OFFSET (SELECT (COUNT(*) - 1) / 2
--             FROM ratings)
--         )
--     )
-- SELECT
--     CASE
--         WHEN avg_rating > median_rating THEN 'Yes'
--         ELSE 'No'
--     END as is_avg_higher
-- FROM AvgRating, MedianRating;

-- average rating by first letter of title
-- SELECT
--     UPPER(SUBSTR(movies.title, 1, 1)) AS starting_letter,
--     AVG(ratings.rating) AS average_rating
-- FROM movies
-- JOIN ratings ON movies.id = ratings.movie_id
-- WHERE UPPER(SUBSTR(movies.title, 1, 1)) BETWEEN 'A' AND 'Z'
-- GROUP BY starting_letter
-- ORDER BY average_rating DESC;

-- SELECT
--     SUBSTR(movies.title, 1, 1) AS starting_letter,
--     AVG(ratings.rating) AS average_rating
-- FROM
--     movies
-- JOIN
--     ratings ON movies.id = ratings.movie_id
-- WHERE
--     SUBSTR(movies.title, 1, 1) BETWEEN 'A' AND 'Z'
-- GROUP BY
--     starting_letter
--   ORDER BY
--     average_rating DESC;

-- BEGIN TRANSACTION;
-- INSERT INTO movies (title, year) VALUES ('Oppenheimer', 2023);
-- INSERT INTO directors (movie_id, person_id)
-- VALUES (
--   (SELECT id FROM movies WHERE title = 'Oppenheimer' AND year = 2023),
--   (SELECT id FROM people WHERE name = 'Christopher Nolan')
-- );
-- COMMIT;

-- SELECT * FROM movies WHERE title = 'Oppenheimer' AND year = 2023;
SELECT * FROM ratings WHERE movie_id IN (15398776, 22802529);

INSERT INTO ratings (movie_id, rating, votes)
VALUES (
    (SELECT id FROM movies WHERE title = 'Oppenheimer' AND year = 2023),
    8.5,
    1000
);

-- SELECT people.*
-- FROM stars
-- JOIN people ON stars.person_id = people.id
-- WHERE movie_id = 15398776;

-- SELECT m.year, m.title, r.rating
-- FROM (
--     SELECT year, MAX(rating) as max_rating
--     FROM movies
--     JOIN ratings ON movies.id = ratings.movie_id
--     WHERE votes >= 40000
--     GROUP BY year
-- ) yr_max
-- JOIN movies m ON m.year = yr_max.year
-- JOIN ratings r ON m.id = r.movie_id AND r.rating = yr_max.max_rating
-- WHERE r.votes >= 40000
-- ORDER BY m.year DESC;

-- select all star names that have starred in a movie "Avengers: Age of Ultron"
-- SELECT p.name
-- FROM people p
-- JOIN stars s ON p.id = s.person_id
-- JOIN movies m ON s.movie_id = m.id
-- WHERE m.title = 'Avengers: Age of Ultron';

-- SELECT movies.title, ps.name
-- FROM movies
-- JOIN directors ON movies.id = directors.movie_id
-- JOIN people ps ON directors.person_id = ps.id
-- WHERE ps.name = 'Quentin Tarantino';

-- LEFT JOIN directors ON movies.id = directors.movie_id
-- AND directors.person_id IS NULL;

-- SELECT m.title, p.name
-- FROM stars s
-- JOIN directors d ON s.movie_id = d.movie_id AND s.person_id = d.person_id
-- JOIN movies m ON m.id = s.movie_id
-- JOIN people p ON p.id = s.person_id;
