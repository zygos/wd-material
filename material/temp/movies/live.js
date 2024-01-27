import sqlite from 'better-sqlite3';
const db = sqlite('movies.db');

const userInput = process.argv[2];
try {
    const year = db
        .prepare('SELECT year FROM movies WHERE title = ?')
        .get([userInput])
    if (year) console.log(`${userInput} was released in ${year}`)
    else console.log('This movie is not in database')
} catch (err) {
    console.log(err)
} finally {
    db.close
}