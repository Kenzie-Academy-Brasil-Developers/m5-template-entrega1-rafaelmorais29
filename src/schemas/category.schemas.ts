import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(3).max(50),
});

export const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    tasks: z.array(z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        finished: z.boolean(),
    })),
});

export type TCreateCategorySchema = z.infer<typeof createCategorySchema>;
export type TCategorySchema = z.infer<typeof categorySchema>;
