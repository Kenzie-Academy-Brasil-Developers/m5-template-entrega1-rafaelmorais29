import { z } from 'zod';

export const registerUserSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
});

export const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
});

export type TRegisterUserSchema = z.infer<typeof registerUserSchema>;
export type TLoginUserSchema = z.infer<typeof loginUserSchema>;
export type TUserSchema = z.infer<typeof userSchema>;
