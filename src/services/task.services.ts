import { prisma } from "../database/prisma";
import { TCreateTaskSchema, TTaskSchema, TUpdateTaskSchema } from "../schemas/task.schemas";

export class TaskService {
    async createTask(taskData: TCreateTaskSchema): Promise<TTaskSchema> {
        const createdTask = await prisma.task.create({
            data: taskData,
            include: { category: true }
        });
        return createdTask;
    }

    async getTasks(category?: string): Promise<TTaskSchema[]> {
        if (category) {
            const tasks = await prisma.task.findMany({
                where: {
                    category: {
                        name: {
                            equals: category.toLowerCase(),
                        },
                    },
                },
                include: { category: true }
            });
            return tasks;
        } else {
            const tasks = await prisma.task.findMany({
                include: { category: true }
            });
            return tasks;
        }
    }

    async getTaskById(id: number): Promise<TTaskSchema | null> {
        const task = await prisma.task.findUnique({
            where: { id },
            include: { category: true }
        });
        return task;
    }

    async updateTask(id: number, taskData: TUpdateTaskSchema): Promise<TTaskSchema | null> {
        const updatedTask = await prisma.task.update({
            where: { id },
            data: taskData,
            include: { category: true }
        });
        return updatedTask;
    }

    async deleteTask(id: number): Promise<void> {
        await prisma.task.delete({
            where: { id }
        });
    }
}