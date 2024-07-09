import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z.string().min(3).max(255),
    content: z.string().min(3),
    categoryId: z.number().optional(),
});

export const updateTaskSchema = z.object({
    title: z.string().min(3).max(255).optional(),
    content: z.string().min(3).optional(),
    finished: z.boolean().optional(),
    categoryId: z.number().optional(),
});

export const taskSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    finished: z.boolean(),
    categoryId: z.number().nullable(),
});

export type TCreateTaskSchema = z.infer<typeof createTaskSchema>;
export type TUpdateTaskSchema = z.infer<typeof updateTaskSchema>;
export type TTaskSchema = z.infer<typeof taskSchema>;
