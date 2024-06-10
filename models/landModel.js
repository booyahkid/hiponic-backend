const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 5432,
});

exports.create = async (name, userId) => {
    const result = await pool.query('INSERT INTO lands (name, user_id) VALUES ($1, $2) RETURNING *', [name, userId]);
    return result.rows[0];
};

exports.update = async (id, name, userId) => {
    const result = await pool.query('UPDATE lands SET name = $1 WHERE id = $2 AND user_id = $3 RETURNING *', [name, id, userId]);
    return result.rows[0];
};

exports.delete = async (id, userId) => {
    await pool.query('DELETE FROM lands WHERE id = $1 AND user_id = $2', [id, userId]);
};

exports.getById = async (id, userId) => {
    const result = await pool.query('SELECT * FROM lands WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
};

exports.getAllByUserId = async (userId) => {
    const result = await pool.query('SELECT id, name FROM lands WHERE user_id = $1', [userId]);
    return result.rows;
};
