const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.create = async (username, email, password) => {
    const result = await pool.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    return result.rows[0];
};

exports.findByUsernameOrEmail = async (username, email) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    return result.rows[0];
};

exports.findByIdentifier = async (identifier) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [identifier]);
    return result.rows[0];
};

exports.findByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

exports.updatePassword = async (userId, newPassword) => {
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [newPassword, userId]);
};