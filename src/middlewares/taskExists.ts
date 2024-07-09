import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database/prisma';

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = Number(req.params.id);
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    next();
};
