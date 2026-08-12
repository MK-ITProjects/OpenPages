import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware.js';
import { register, login, me } from './auth.controller.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);

export default router;
