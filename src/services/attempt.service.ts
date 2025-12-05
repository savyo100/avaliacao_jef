import { prisma } from "../lib/prisma";

export const attemptService = {
    async getAll() {
        return prisma.attempt.findMany({
            include: {
                user: true
            }
        });
    },

    async getById(id: number) {
        return prisma.attempt.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        });
    },
    async create(data: {userId: number; word: string; similarity: number; rank: number}) {
        return prisma.attempt.create({ data });
    },
    async update(
        id: number,
        data: Partial<{userId: number; word: string; similarity: number; rank: number}>
    ) {
        return prisma.attempt.update({
            where: { id },
            data
        });
    },
    async delete(id: number) {
        return prisma.attempt.delete({
            where: { id }
        });
    }
}