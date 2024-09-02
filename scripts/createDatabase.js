const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tweets.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tweets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    ar_address TEXT NOT NULL UNIQUE
  )`, (err) => {
    if (err) {
      console.error('Error creating tweets table:', err.message);
    } else {
      console.log('Tweets table with unique constraints created successfully.');
    }
  });
});

db.close();
