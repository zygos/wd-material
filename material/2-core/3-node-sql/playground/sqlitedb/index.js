import sqlite from 'better-sqlite3'

const db = sqlite('favorites.db')

const favorites = db
  .prepare(`SELECT COUNT(*) AS n FROM favorites WHERE problem = ?`)
  .all(['Mario']);

console.log(favorites)
