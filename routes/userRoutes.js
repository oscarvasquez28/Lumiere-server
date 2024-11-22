import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

//    /api/users
// Router pattern
router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.put('/', (req, res) => res.send('actualizando usuarios'));
router.delete('/', (req, res) => res.send('eliminando usuarios'));

router.get('/user/:userId', userController.getUser);
router.post('/login', userController.login);
router.put('/updateUser', userController.updateUser);

export default router;
