import express from 'express';

import PostController from '../controllers/posts';
import checkAuth from '../middlewares/auth';

const router = express.Router();

router.get('/:postId', checkAuth, PostController.getPost);
router.post('/', checkAuth, PostController.createPost);
router.post('/:postId/like', checkAuth, PostController.likePost);

export default router;
