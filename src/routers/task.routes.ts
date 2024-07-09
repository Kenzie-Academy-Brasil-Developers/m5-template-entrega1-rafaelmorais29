import express from 'express';
import { TaskController } from '../controllers/task.controllers';
import { verifyToken } from '../middlewares/verifyToken.middleware';

const router = express.Router();
const taskController = new TaskController();

router.post('/', verifyToken, taskController.create);

router.get('/', verifyToken, taskController.getAll);

router.get('/:id', verifyToken, taskController.getById);

router.patch('/:id', verifyToken, taskController.update);

router.delete('/:id', verifyToken, taskController.delete);

export default router;
