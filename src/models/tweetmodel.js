const db = require('./db');

const saveTweetData = (username, arAddress) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO tweets (username, ar_address) VALUES (?, ?)`,
      [username, arAddress],
      function (err) {
        if (err) {
          if (err.code === 'SQLITE_CONSTRAINT') {
            if (err.message.includes('username')) {
              console.error('Duplicate username detected:', err.message);
              return reject(new Error('Username already exists.'));
            } else if (err.message.includes('ar_address')) {
              console.error('Duplicate Arweave address detected:', err.message);
              return reject(new Error('Arweave address already exists.'));
            } else {
              console.error('Constraint violation detected:', err.message);
              return reject(new Error('Constraint violation.'));
            }
          } else {
            console.error('Error inserting data into tweets table:', err.message);
            return reject(err);
          }
        }
        resolve(this.lastID);
      }
    );
  });
};

module.exports = { saveTweetData };
