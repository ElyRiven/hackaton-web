import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, 'sqldatabase.db');

const db = new Database(dbPath);

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    points INTEGER,
    comment TEXT
  )
`;

db.exec(createTableQuery);

const insertDefaultUsersQuery = `
  INSERT INTO users (username, password, points, comment) VALUES
  ('user1', 'password1', 100, 'First user comment'),
  ('user2', 'password2', 200, 'Second user comment')
`;

const userCount = db.prepare('SELECT COUNT(*) AS count FROM users').get().count;
if (userCount === 0) {
  db.exec(insertDefaultUsersQuery);
}

function getComments() {
  return db.prepare('SELECT username, comment, points FROM users').all();
}

export { db, getComments };