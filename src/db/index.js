const { Pool } = require('pg');

const pool = new Pool({
  user: 'jesse',
  host: 'localhost',
  database: 'vetsplace',
  password: 'Stlouis5',
  port: 5433,
});

module.exports = pool;
