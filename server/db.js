const { Pool } = require('pg');

const pool = new Pool({
    user: 'Spikes',
    password: '2212',
    host: 'localhost',
    port: 5432, // default Postgres port
    database: 'MercuryDB'
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};