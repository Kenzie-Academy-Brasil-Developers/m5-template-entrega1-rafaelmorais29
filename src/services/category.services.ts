import { prisma } from "../database/prisma";
import { TCategorySchema, TCreateCategorySchema } from "../schemas/category.schemas";

export class CategoryService {
    async create(userId: number, categoryData: TCreateCategorySchema): Promise<TCategorySchema> {
        const createdCategory = await prisma.category.create({
            data: {
                ...categoryData,
                user: { connect: { id: userId } }
            },
            include: { tasks: true }
        });
        return createdCategory;
    }

    async delete(id: number): Promise<void> {
        await prisma.category.delete({
            where: { id }
        });
    }
}