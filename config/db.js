import mysql from 'mysql';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from './config.js';

// Log de las variables de entorno (para depuración)
console.log('DB_HOST:', DB_HOST);
console.log('DB_USER:', DB_USER);
console.log('DB_PASSWORD:', DB_PASSWORD);
console.log('DB_DATABASE:', DB_DATABASE);

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
