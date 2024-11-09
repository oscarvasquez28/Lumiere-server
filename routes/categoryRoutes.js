import express from 'express';
import * as categoryController from '../controllers/categoryController.js';

const router = express.Router();

//    /api/categories

router.get('/', categoryController.getCategories);
// router.post('/', categoryController.createCategory);
// router.put('/:id', categoryController.updateCategory);
// router.delete('/:id', categoryController.deleteCategory);

export default router;
