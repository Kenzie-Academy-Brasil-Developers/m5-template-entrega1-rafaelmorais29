import express from 'express';
import { VerifyUserCredentials } from '../middlewares/verifyUserCredentials.middleware';
import { UserController } from '../controllers/user.controllers';

const router = express.Router();
const userController = new UserController();

router.post('/', userController.register);

router.post('/login', VerifyUserCredentials.execute, userController.login);

router.get('/profile', VerifyUserCredentials.execute, userController.getUser);

export default router;
