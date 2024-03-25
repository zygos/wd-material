/* createTables/index.ts */
export default function createTables(database) {
  database.exec(`CREATE TABLE customer (
    id integer PRIMARY KEY,
    name varchar NOT NULL
  )`)
}
