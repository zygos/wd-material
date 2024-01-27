SELECT movie_id
FROM stars
WHERE person_id = (
  SELECT person_id
  FROM people
  WHERE people.name = 'Scarlett Johansson'
);
