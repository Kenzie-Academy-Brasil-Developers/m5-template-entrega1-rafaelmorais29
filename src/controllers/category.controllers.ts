import { Request, Response } from 'express';
import { CategoryService } from '../services/category.services';
import { AppError } from '../errors/appError';

export class CategoryController {
    async create(req: Request, res: Response) {
        const categoryService = new CategoryService();
        try {
            const userId = res.locals.decode.id;
            const categoryData = {
                ...req.body,
                userId: userId
            };
            const category = await categoryService.create(res.locals.decode.id, categoryData);
        } catch (error: any) { 
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req: Request, res: Response) {
        const categoryService = new CategoryService();
        try {
            const categoryId: number = parseInt(req.params.id);
            await categoryService.delete(categoryId);
            res.status(204).json();
        } catch (error: any) { 
            if (error instanceof AppError && error.statusCode === 403) {
                res.status(403).json({ message: 'This user is not the category owner' });
            } else {
                res.status(404).json({ message: error.message });
            }
        }
    }
}
