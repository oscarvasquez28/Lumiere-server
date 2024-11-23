import db from '../config/db.js';


export const getPosts = (callback) => {
    const sql = `
        SELECT posts.id AS post_id, posts.title, posts.status, posts.created_at,
            users.id AS user_id, users.username, categories.name AS category_name, post_images.image
        FROM posts
        JOIN users ON posts.user_id = users.id
        JOIN categories ON posts.category_id = categories.id
        LEFT JOIN post_images ON posts.id = post_images.post_id
    `;

    db.query(sql, (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            let postsWithImages = [];

            // Agrupar imágenes por post
            results.forEach(post => {
                let existingPost = postsWithImages.find(p => p.post_id === post.post_id);

                if (existingPost) {
                    existingPost.images.push(post.image);
                } else {
                    postsWithImages.push({
                        post_id: post.post_id,
                        title: post.title,
                        status: post.status,
                        created_at: post.created_at,
                        user_id: post.user_id,
                        username: post.username,
                        category_name: post.category_name,
                        images: [post.image]  // Iniciar el array de imágenes con la primera imagen
                    });
                }
            });

            // Convertir las imágenes de cada post a base64 SOLO si son tipo Buffer
            postsWithImages.forEach(post => {
                post.images = post.images.map(image => {
                    // Si la imagen es un Buffer, la convertimos a base64
                    if (Buffer.isBuffer(image)) {
                        return image.toString('base64');
                    }
                    // Si no es un Buffer, solo devolvemos la imagen tal cual (puede ser URL o cadena de texto)
                    return image;
                });
            });

            callback(null, postsWithImages);
        } else {
            callback(new Error("No se encontraron posts"));
        }
    });
};




export const createPost = (postData, callback) => {
    const sql = 'INSERT INTO posts (title, user_id, category_id, status) VALUES (?, ?, ?, ?)';
    db.query(sql, [postData.title, postData.user_id, postData.category_id, postData.status], (error, result) => {
        if (error) return callback(error);

        const postId = result.insertId;  // ID de la nueva publicación insertada

        // Insertar las imágenes si existen
        if (postData.images && postData.images.length > 0) {
            const imageQueries = postData.images.map(image => {
                const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
                const imageBuffer = Buffer.from(base64Image, 'base64');
                return new Promise((resolve, reject) => {
                    const sqlImage = 'INSERT INTO post_images (post_id, image) VALUES (?, ?)';
                    db.query(sqlImage, [postId, imageBuffer], (error) => {
                        if (error) reject(error);
                        resolve();
                    });
                });
            });

            // Esperar a que todas las imágenes se inserten
            Promise.all(imageQueries)
                .then(() => callback(null, { status: 'success', postId }))
                .catch(callback);
        } else {
            callback(null, { status: 'success', postId });
        }
    });
};

export const getPostByUserId = (userId, callback) => {
    const sql = `
        SELECT posts.id AS post_id, posts.title, posts.status, posts.created_at,
               users.id AS user_id, users.username, categories.name AS category_name, post_images.image
        FROM posts
        JOIN users ON posts.user_id = users.id
        JOIN categories ON posts.category_id = categories.id
        LEFT JOIN post_images ON posts.id = post_images.post_id
        WHERE posts.user_id = ?
    `;

    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            let postsWithImages = [];

            // Agrupar imágenes por post
            results.forEach(post => {
                let existingPost = postsWithImages.find(p => p.post_id === post.post_id);

                if (existingPost) {
                    existingPost.images.push(post.image);
                } else {
                    postsWithImages.push({
                        post_id: post.post_id,
                        title: post.title,
                        status: post.status,
                        created_at: post.created_at,
                        user_id: post.user_id,
                        username: post.username,
                        category_name: post.category_name,
                        images: [post.image]  // Iniciar el array de imágenes con la primera imagen
                    });
                }
            });

            // Convertir las imágenes de cada post a base64 SOLO si son tipo Buffer
            postsWithImages.forEach(post => {
                post.images = post.images.map(image => {
                    // Si la imagen es un Buffer, la convertimos a base64
                    if (Buffer.isBuffer(image)) {
                        return image.toString('base64');
                    }
                    // Si no es un Buffer, solo devolvemos la imagen tal cual (puede ser URL o cadena de texto)
                    return image;
                });
            });

            callback(null, { status: 'success', list: postsWithImages });
        } else {
            callback(null, { status: 'error', message: 'No se encontraron posts.' });
        }
    });
};



export const updatePostStatus = (postData, callback) => {
    const sql = 'UPDATE posts SET status = ? WHERE id = ?';
    db.query(sql, [postData.status, postData.id], callback);
}

export const AdvancedSearch = (postData, callback) => {
    // Modificar la consulta para obtener todas las imágenes relacionadas con cada post
    const sql = `
        SELECT posts.id AS post_id, posts.title, posts.status, posts.created_at,
            users.id AS user_id, users.username, categories.name AS category_name,
            post_images.image
        FROM posts
        JOIN users ON posts.user_id = users.id
        JOIN categories ON posts.category_id = categories.id
        LEFT JOIN post_images ON posts.id = post_images.post_id
        WHERE posts.title LIKE ?
        AND posts.category_id = ?
        AND posts.status = 1
        ORDER BY posts.created_at DESC;
    `;

    db.query(sql, [`%${postData.title}%`, postData.category_id], (error, results) => {
        if (error) return callback(error);

        if (results.length > 0) {
            // Crear un objeto para almacenar las imágenes de cada post
            let postsWithImages = [];

            // Agrupar imágenes por post
            results.forEach(post => {
                // Buscar si el post ya existe en el array
                let existingPost = postsWithImages.find(p => p.post_id === post.post_id);

                if (existingPost) {
                    // Si el post ya existe, agregar la imagen a su array de imágenes
                    existingPost.images.push(post.image);
                } else {
                    // Si el post no existe, crear una nueva entrada con la primera imagen
                    postsWithImages.push({
                        post_id: post.post_id,
                        title: post.title,
                        status: post.status,
                        created_at: post.created_at,
                        user_id: post.user_id,
                        username: post.username,
                        category_name: post.category_name,
                        images: [post.image] // Crear un array de imágenes con la primera imagen
                    });
                }
            });

            // Ahora convertimos las imágenes de cada post a base64 y asignamos al campo images
            postsWithImages.forEach(post => {
                post.images = post.images.map(image => image.toString('base64')); // Convertir cada imagen a base64
            });

            callback(null, { status: 'success', list: postsWithImages });
        } else {
            callback(null, { status: 'error', message: 'No se encontraron posts.' });
        }
    });
};


export const updatePost = (postData, callback) => {
    // Primero, actualizar los datos de la publicación
    const sql = 'UPDATE posts SET title = ?, user_id = ?, category_id = ?, status = ? WHERE id = ?';
    db.query(sql, [postData.title, postData.user_id, postData.category_id, postData.status, postData.id], (error) => {
        if (error) return callback(error);

        // Eliminar las imágenes actuales de la publicación
        const deleteImagesSql = 'DELETE FROM post_images WHERE post_id = ?';
        db.query(deleteImagesSql, [postData.id], (error) => {
            if (error) return callback(error);

            // Insertar las nuevas imágenes si existen
            if (postData.images && postData.images.length > 0) {
                const imageQueries = postData.images.map(image => {
                    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");
                    const imageBuffer = Buffer.from(base64Image, 'base64');
                    return new Promise((resolve, reject) => {
                        const sqlImage = 'INSERT INTO post_images (post_id, image) VALUES (?, ?)';
                        db.query(sqlImage, [postData.id, imageBuffer], (error) => {
                            if (error) reject(error);
                            resolve();
                        });
                    });
                });

                // Esperar a que todas las imágenes se inserten
                Promise.all(imageQueries)
                    .then(() => callback(null, { status: 'success' }))
                    .catch(callback);
            } else {
                callback(null, { status: 'success' });
            }
        });
    });
};
