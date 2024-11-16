// controllers/userController.js
import { userServiceFactory } from '../services/userServiceFactory.js';

export const getUsers = (req, res) => {
    const service = userServiceFactory('get'); // Acción: obtener todos los usuarios
    service.handleRequest(req, res);
};

export const createUser = (req, res) => {
    const service = userServiceFactory('create'); // Acción: crear un usuario
    service.handleRequest(req, res);
};

export const login = (req, res) => {
    const service = userServiceFactory('login'); // Acción: login
    service.handleRequest(req, res);
};

export const getUser = (req, res) => {
    const service = userServiceFactory('getOne'); // Acción: obtener un usuario por ID
    service.handleRequest(req, res);
};

export const updateUser = (req, res) => {
    const service = userServiceFactory('update'); // Acción: actualizar un usuario
    service.handleRequest(req, res);
};
