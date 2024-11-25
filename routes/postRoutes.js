import express from 'express';
import * as postController from '../controllers/postController.js';

const router = express.Router();

//    /api/posts

router.get('/', postController.getPosts);
router.post('/', postController.createPost);

router.get('/post/:userId', postController.getPostByUserId);
router.post('/updatePost', postController.updatePostStatus);
router.post('/advancedSearch', postController.AdvancedSearch);
router.post('/editPost', postController.updatePost);

export default router;
