import Database from 'better-sqlite3';
import { join } from 'path';

// join is not necessary here, but it is a good practice to use
// it as we do not want to make any assumptions about the current
// working directory of the process
export default new Database(join(__dirname, '../../data/database.db'));
