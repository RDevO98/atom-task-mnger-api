import { Router } from 'express';
import {
    getUserByEmailHandler,
    createUserHandler
} from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:email', authMiddleware, getUserByEmailHandler);
router.post('/', authMiddleware, createUserHandler);

export default router;