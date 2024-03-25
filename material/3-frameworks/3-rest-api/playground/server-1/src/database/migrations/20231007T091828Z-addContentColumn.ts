import { type Database } from 'better-sqlite3';

export const timestamp = new Date('2023-10-07T09:18:28Z');

export function up(db: Database) {
  const query = `
    ALTER TABLE article
    ADD COLUMN content TEXT
  `;

  db.exec(query);
}
