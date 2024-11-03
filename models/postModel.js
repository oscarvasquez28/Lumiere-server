import db from '../config/db.js';

export const getPosts = (callback) => {
    db.query('SELECT * FROM posts', callback);
};

export const createPost = (postData, callback) => {
    const sql = 'INSERT INTO posts (title, user_id, category_id, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [postData.title, postData.user_id, postData.category_id, postData.image], callback);
};
