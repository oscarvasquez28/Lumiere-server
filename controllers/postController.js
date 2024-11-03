import * as postModel from '../models/postModel.js';

export const getPosts = (req, res) => {
    postModel.getPosts((err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
};

export const createPost = (req, res) => {
    postModel.createPost(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Error inserting post" });
        }
        return res.status(201).json({ Message: "Post created successfully", postId: result.insertId });
    });
};
