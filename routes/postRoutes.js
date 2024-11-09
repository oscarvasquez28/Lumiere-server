import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

//    /api/posts

router.get('/', postController.getPosts);
router.post('/', postController.createPost);

router.get('/post/:userId', postController.getPostByUserId);
router.post('/updatePost', postController.updatePostStatus);

export default router;
