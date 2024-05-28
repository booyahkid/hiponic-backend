const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.create = async (userId, code, expires) => {
    await pool.query('INSERT INTO password_resets (user_id, code, expires) VALUES ($1, $2, $3)', [userId, code, expires]);
};

exports.findByCode = async (code) => {
    const result = await pool.query('SELECT * FROM password_resets WHERE code = $1', [code]);
    return result.rows[0];
};

exports.delete = async (id) => {
    await pool.query('DELETE FROM password_resets WHERE id = $1', [id]);
};
