import { Request, Response } from 'express';
import { UserService } from '../services/user.services';

export class UserController {
    async register(req: Request, res: Response) {
        const userServices = new UserService();
        try {
            const userData = req.body;
            const newUser = await userServices.registerUser(userData);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        const userServices = new UserService();
        try {
            const credentials = req.body;
            const token = await userServices.loginUser(credentials);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    async getUser(req: Request, res: Response) {
        const userServices = new UserService();
        try {
            const userId: number = parseInt(req.params.id);
            const user = await userServices.getUserById(userId);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(404).json({ message: error.message });
        }
    }
}
