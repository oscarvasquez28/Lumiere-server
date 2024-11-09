import db from '../config/db.js';


export const getPosts = (callback) => {
    const sql = 'SELECT * FROM posts';
    db.query(sql, (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            // Iterar sobre cada post y convertir la imagen a Base64
            results.forEach(post => {
                if (post.image) {
                    post.image = post.image.toString('base64');
                }
            });
            callback(null, results);
        } else {
            callback(new Error("No se encontraron posts"));
        }
    });
};

export const createPost = (postData, callback) => {

    // Decodificar la imagen desde Base64 a binario
    const base64Image = postData.image.replace(/^data:image\/\w+;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, 'base64');

    const sql = 'INSERT INTO posts (title, user_id, category_id, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [postData.title, postData.user_id, postData.category_id, imageBuffer], callback);
};

export const getPostByUserId = (userId, callback) => {
    const sql = 'SELECT * FROM posts WHERE user_id = ?';
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            // Iterar sobre cada post y convertir la imagen a Base64
            results.forEach(post => {
                if (post.image) {
                    post.image = post.image.toString('base64');
                }
            });
            callback(null, results);
        } else {
            callback(new Error("No se encontraron posts"));
        }
    });
};

export const updatePostStatus = (postData, callback) => {
    const sql = 'UPDATE posts SET status = ? WHERE id = ?';
    db.query(sql, [postData.status, postData.id], callback);
}

