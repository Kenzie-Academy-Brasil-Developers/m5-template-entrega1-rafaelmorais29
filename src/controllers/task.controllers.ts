import { Request, Response } from 'express';
import { TaskService } from '../services/task.services';
import { AppError } from '../errors/appError';

export class TaskController {
    async create(req: Request, res: Response) {
        const taskServices = new TaskService();
        try {
            const taskData = req.body;
            const task = await taskServices.createTask(taskData);
            res.status(201).json(task);
        } catch (error: any) { 
            res.status(400).json({ message: error.message });
        }
    }

    async getAll(req: Request, res: Response) {
        const taskServices = new TaskService();
        try {
            let tasks;
            if (req.query.category) {
                tasks = await taskServices.getTasks(req.query.category as string);
            } else {
                tasks = await taskServices.getTasks(); 
            }
            res.status(200).json(tasks);
        } catch (error: any) { 
            res.status(404).json({ message: error.message });
        }
    }
    
    async getById(req: Request, res: Response) {
        const taskServices = new TaskService();
        try {
            const taskId: number = parseInt(req.params.id);
            const task = await taskServices.getTaskById(taskId);
            res.status(200).json(task);
        } catch (error: any) { 
            res.status(404).json({ message: error.message });
        }
    }

    async update(req: Request, res: Response) {
        const taskServices = new TaskService();
        try {
            const taskId: number = parseInt(req.params.id);
            const taskData = req.body;
            const updatedTask = await taskServices.updateTask(taskId, taskData);
            res.status(200).json(updatedTask);
        } catch (error: any) { 
            if (error instanceof AppError && error.statusCode === 403) {
                res.status(403).json({ message: 'This user is not the task owner' });
            } else {
                res.status(404).json({ message: error.message });
            }
        }
    }

    async delete(req: Request, res: Response) {
        const taskServices = new TaskService();
        try {
            const taskId: number = parseInt(req.params.id);
            await taskServices.deleteTask(taskId);
            res.status(204).json();
        } catch (error: any) { 
            if (error instanceof AppError && error.statusCode === 403) {
                res.status(403).json({ message: 'This user is not the task owner' });
            } else {
                res.status(404).json({ message: error.message });
            }
        }
    }
}
