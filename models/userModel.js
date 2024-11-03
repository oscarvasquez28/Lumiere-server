import db from '../config/db.js';

export const getUsers = (callback) => {
    db.query('SELECT * FROM users', callback);
};

export const createUser = (userData, callback) => {
    const sql = 'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userData.first_name, userData.last_name, userData.email, userData.username, userData.password], callback);
};
