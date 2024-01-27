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
