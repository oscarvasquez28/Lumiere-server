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

export const getUser = (userId, callback) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
    //db.query(sql, [userData.email, userData.password], callback);
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            const user = results[0];
                if (user.profile_picture) {
                    user.profile_picture = user.profile_picture.toString('base64');
                }
                user.status = user.status ? 1 : 0;
                callback(null, { status: 'success', message: 'Usuario obtenido con éxito', user });
        } else {
            callback(null, { status: 'error', message: 'Error al obtener el usuario' });
        }
    });
};

export const updateUser = (userData, callback) => {
    // Decodificar la imagen desde Base64 a binario
    console.log("updating: " + userData.username)
    const base64Image = userData.profile_picture.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const sql = 'UPDATE users SET first_name = ?, last_name = ?, username = ?, password = ?, profile_picture = ? WHERE id = ?';
    db.query(sql, [userData.first_name, userData.last_name, userData.username, userData.password, imageBuffer,userData.id], callback);
}
