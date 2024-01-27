SELECT name, (DATE('now') - birth) AS years_passed
FROM people
WHERE birth IS NOT NULL
ORDER BY birth ASC -- or ORDER BY years_passed DESC
LIMIT 10;