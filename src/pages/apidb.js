import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, 'sqldatabase.db');
const db = new Database(dbPath);

export function validateUser(username, password) {
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  const user = db.prepare(query).get(username, password);
  return user !== undefined;
}

export { validateUser };