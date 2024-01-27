-- SELECT people.name
-- FROM people
-- WHERE people.id IN (
--   SELECT stars.person_id
--   FROM stars
--   WHERE stars.movie_id IN (
--     SELECT stars.movie_id
--     FROM stars
--     WHERE stars.person_id IN (
--       SELECT id
--       FROM people
--       WHERE people.birth = 1958
--       AND name = 'Kevin Bacon'
--     )
--   )
--   AND stars.person_id NOT IN (
--     SELECT id
--     FROM people
--     WHERE people.birth = 1958
--     AND name = 'Kevin Bacon'
--   )
-- );

BEGIN TRANSACTION;

-- find the movie id from the movie title
SELECT id INTO @movie_id FROM movies WHERE title = "12 Angry Men";

-- update the movie release year
UPDATE movies
SET year = 1957
WHERE id = @movie_id;

-- update the movie rating
UPDATE ratings
SET rating = 4.5
WHERE movie_id = @movie_id;

COMMIT;