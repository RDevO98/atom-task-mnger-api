import { Router } from 'express';
import {
    getAllTasksHandler,
    getTaskByIdHandler,
    createTaskHandler,
    updateTaskHandler,
    deleteTaskHandler
} from '../controllers/TaskController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware, getAllTasksHandler);
router.get('/:id', authMiddleware, getTaskByIdHandler);
router.post('/', authMiddleware, createTaskHandler);
router.put('/:id', authMiddleware, updateTaskHandler);
router.delete('/:id', authMiddleware, deleteTaskHandler);

export default router;