import Database from 'better-sqlite3'

const db = new Database('movies.db')

db.exec(`
CREATE TABLE studios (
  id INTEGER,
  title TEXT NOT NULL,
  PRIMARY KEY(id)
)`)
