import Database from 'better-sqlite3';

// get command line arguments
const title = process.argv[2];
const year = Number(process.argv[3]);

if (isNaN(year)) {
  throw new Error('Year must be a numeric value.');
}

const db = new Database('movies.db');

// check if movie already exists
const movie = db
  .prepare('SELECT id FROM movies WHERE title = ? AND year = ?')
  .get(title, year);

if (movie) {
  throw new Error('A movie with the same title and year already exists.');
}

const insertMovie = db.transaction((title, year) => {
  const { id: movieId } = db
    .prepare('INSERT INTO movies (title, year) VALUES (?, ?) RETURNING id')
    .get(title, year);

  return movieId;
});

const movieId = insertMovie(title, year);

console.log('New movie ID:', movieId);
