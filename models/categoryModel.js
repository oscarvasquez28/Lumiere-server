import db from '../config/db.js';

export const getCategories = (callback) => {
    db.query('SELECT * FROM categories', callback);
};

// export const createCategory = (categoryData, callback) => {
//   const sql = 'INSERT INTO categories (name) VALUES (?)';
//   db.query(sql, [categoryData.name], callback);
// };

// export const updateCategory = (id, categoryData, callback) => {
//   const sql = 'UPDATE categories SET name = ? WHERE id = ?';
//   db.query(sql, [categoryData.name, id], callback);
// };

// export const deleteCategory = (id, callback) => {
//   const sql = 'DELETE FROM categories WHERE id = ?';
//   db.query(sql, [id], callback);
// };