const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

pool.on('connect', () => {
  console.log('Base de Dados conectado com sucesso!');
});

pool.on('error', (err) => {
  console.log(err);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};