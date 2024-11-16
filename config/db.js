import mysql from 'mysql';

import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} from './config.js';
// Singleton pattern
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Database connected');
});

export default db;
