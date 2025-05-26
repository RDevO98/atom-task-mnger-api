import { Router } from 'express';
import taskRoutes from './task';
import userRoutes from './user';
import authRoutes from './auth';

const router = Router();

router.get('/', (_, res) => {
    res.send("¡Task Manager API, it's working!");
});

router.use('/tasks', taskRoutes);
router.use('/users', userRoutes);
router.use('/', authRoutes);

export default router;