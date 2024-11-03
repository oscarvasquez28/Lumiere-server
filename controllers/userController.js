import * as userModel from '../models/userModel.js';

export const getUsers = (req, res) => {
    userModel.getUsers((err, result) => {
        if (err) {
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
};

export const createUser = (req, res) => {
    userModel.createUser(req.body, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Error inserting user" });
        }
        return res.status(201).json({ Message: "User created successfully", userId: result.insertId });
    });
};
