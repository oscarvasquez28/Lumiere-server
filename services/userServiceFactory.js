// services/userServiceFactory.js
import * as userModel from '../models/userModel.js';

class UserService {
    constructor() {
        if (new.target === UserService) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    handleRequest(req, res) {
        throw new Error('Method "handleRequest" must be implemented');
    }
}

class CreateUserService extends UserService {
    handleRequest(req, res) {
        userModel.createUser(req.body, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ Message: "Error inserting user" });
            }
            return res.status(201).json({ Message: "User created successfully", userId: result.insertId });
        });
    }
}

class GetUsersService extends UserService {
    handleRequest(req, res) {
        userModel.getUsers((err, result) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }
            return res.json(result);
        });
    }
}

class LoginUserService extends UserService {
    handleRequest(req, res) {
        userModel.login(req.body, (err, result) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }
            return res.json(result);
        });
    }
}

class GetUserService extends UserService {
    handleRequest(req, res) {
        userModel.getUser(req.params.userId, (err, result) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }
            return res.json(result);
        });
    }
}

class UpdateUserService extends UserService {
    handleRequest(req, res) {
        userModel.updateUser(req.body, (err, result) => {
            if (err) {
                return res.json({ Message: "Error inside server" });
            }
            return res.json(result);
        });
    }
}

export const userServiceFactory = (action) => {
    switch (action) {
        case 'create':
            return new CreateUserService();
        case 'get':
            return new GetUsersService();
        case 'login':
            return new LoginUserService();
        case 'getOne':
            return new GetUserService();
        case 'update':
            return new UpdateUserService();
        default:
            throw new Error('Invalid action');
    }
};
