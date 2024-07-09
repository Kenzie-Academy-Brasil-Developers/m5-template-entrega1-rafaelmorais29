import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/appError';
import { UserService } from '../services/user.services';

export class VerifyUserCredentials {
    static async execute(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const userService = new UserService();

            const user = await userService.loginUser({ email, password });

            if (!user) {
                throw new AppError('User not exists', 404);
            }

            next();
        } catch (error) {

            next(error);
        }
    }
}
