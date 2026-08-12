import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import * as commentController from './comment.controller.js';

const router = Router({ mergeParams: true });

router.get('/', commentController.index);
router.post('/', requireAuth, commentController.create);
router.delete('/:id', requireAuth, commentController.destroy);

export default router;
