import db from '../config/db.js';

export const getUsers = (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            // Iterar sobre cada post y convertir la imagen a Base64
            results.forEach(user => {
                if (user.profile_picture) {
                    user.profile_picture = user.profile_picture.toString('base64');
                }
                user.status = user.status ? 1 : 0;
            });
            callback(null, results);
        } else {
            callback(new Error("No se encontraron posts"));
        }
    });
};

export const createUser = (userData, callback) => {
    const sql = 'INSERT INTO users (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userData.first_name, userData.last_name, userData.email, userData.username, userData.password], callback);
};

export const login = (userData, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    //db.query(sql, [userData.email, userData.password], callback);
    db.query(sql, [userData.email, userData.password], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            const user = results[0];
                if (user.profile_picture) {
                    user.profile_picture = user.profile_picture.toString('base64');
                }
                user.status = user.status ? 1 : 0;
                callback(null, { status: 'success', message: 'Login exitoso', user });
        } else {
            callback(null, { status: 'error', message: 'Usuario o contraseña incorrectos' });
        }
    });
};

export const getUser = (userData, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    //db.query(sql, [userData.email, userData.password], callback);
    db.query(sql, [id], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            const user = results[0];
                if (user.profile_picture) {
                    user.profile_picture = user.profile_picture.toString('base64');
                }
                user.status = user.status ? 1 : 0;
                callback(null, { status: 'success', message: 'Login exitoso', user });
        } else {
            callback(null, { status: 'error', message: 'Usuario o contraseña incorrectos' });
        }
    });
};
