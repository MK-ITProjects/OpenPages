import express from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/auth.routes.js';
import userRoutes from './modules/users/user.routes.js';
import postRoutes from './modules/posts/post.routes.js';
import commentRoutes from './modules/comments/comment.routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';
import adminRoutes from "./modules/auth/admin.route.js";



const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/posts/:postId/comments', commentRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
