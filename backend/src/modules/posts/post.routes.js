import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import * as postController from './post.controller.js';

const router = Router();

// Static/nested routes must come before the `/:slug` catch-all.
router.get('/feed', requireAuth, postController.feed);
router.get('/drafts', requireAuth, postController.drafts);
router.get('/top', postController.top);
router.get('/tags/popular', postController.popularTags);
router.get('/search', postController.search);

router.get('/', postController.index);
router.post('/', requireAuth, postController.create);

router.put('/:id', requireAuth, postController.update);
router.delete('/:id', requireAuth, postController.destroy);

router.get("/stats",requireAuth,postController.userStats);

router.get('/:slug', postController.showBySlug);
router.post('/:slug/clap', requireAuth, postController.clap);
router.post('/:slug/bookmark', requireAuth, postController.bookmark);



export default router;
