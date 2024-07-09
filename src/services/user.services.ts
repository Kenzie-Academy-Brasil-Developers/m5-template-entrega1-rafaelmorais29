import { prisma } from "../database/prisma";
import bcrypt from "bcrypt";
import { TLoginUserSchema, TRegisterUserSchema, TUserSchema } from "../schemas/user.schemas";
import { AppError } from "../errors/appError";

export class UserService {
    async registerUser(userData: TRegisterUserSchema): Promise<TUserSchema> {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email }
        });
    
        if (existingUser) {
            throw new AppError('This email is already registered', 409);
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const createdUser = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword
            }
        });
        return createdUser;
    }

    async loginUser(userData: TLoginUserSchema): Promise<TUserSchema | null> {
        const user = await prisma.user.findUnique({
            where: { email: userData.email }
        });

        if (!user) return null;

        const passwordMatch = await bcrypt.compare(userData.password, user.password);
        if (!passwordMatch) return null;

        return user;
    }

    async getUserById(id: number): Promise<TUserSchema | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });
        return user;
    }
}
