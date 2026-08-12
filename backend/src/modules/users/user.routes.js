import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import * as userController from './user.controller.js';

const router = Router();

router.get('/me/bookmarks', requireAuth, userController.bookmarks);
router.get('/suggestions', userController.suggestions);

router.get('/:id', userController.show);
router.get('/:id/following', userController.following);
router.get('/:id/followers', userController.followers);
router.post('/:id/follow', requireAuth, userController.follow);

export default router;
