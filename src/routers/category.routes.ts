import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { CategoryController } from '../controllers/category.controllers';

const router = express.Router();
const categoryController = new CategoryController();

router.post('/', verifyToken, categoryController.create);

router.delete('/:id', verifyToken, categoryController.delete);

export default router;
