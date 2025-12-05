import { prisma } from "../lib/prisma";

export const wordOfTheDayService = {
    async getWordOfTheDay() {
        const today = new Date();
        const wordEntry = await prisma.wordOfTheDay.findUnique({
            where: {
                date: today.toISOString().split('T')[0]
            }
        });
        return wordEntry;
    },

    async getAll() {
        return prisma.wordOfTheDay.findMany();
    },

    async getById(id: number) {
        return prisma.wordOfTheDay.findUnique({
            where: {
                id
            }
        });
    },
    async create(data: {word: string; definition: string}) {
        const today = new Date();
        const wordData = {
            ...data,
            date: today.toISOString().split('T')[0]
        };
        return prisma.wordOfTheDay.create({ data: wordData });
    },
    async update(
        id: number,
        data: Partial<{word: string; definition: string}>
    ) {
        return prisma.wordOfTheDay.update({
            where: { id },
            data
        });
    },
    async delete(id: number) {
        return prisma.wordOfTheDay.delete({
            where: { id }
        });
    }
};