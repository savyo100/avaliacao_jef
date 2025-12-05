import bcrypt from "bcryptjs";
import { User } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export const userService = {
    async getAll() {
        return prisma.user.findMany({
            include: {
                attempts: true
            }
        });
    },

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {
                email
            }
        });
    },
    async register(name: string, email: string, password: string, role: string = "user"): Promise<User> {
        // Prevent duplicate emails
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: role.toLowerCase()
        };
        const createdUser = await prisma.user.create({ data: newUser });
        return createdUser;
    },

    async getById(id: number) {
        return prisma.user.findUnique({
            where: {
                id
            },
            include: {
                attempts: true
            }
        });
    },

    async create(data: {name: string; email: string; password: string; role: string}) {
        // Ensure password is hashed when creating users through this generic method
        const { password, role, name, email } = data;
        // Prevent duplicate emails
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) throw new Error('Email already exists');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: role ? role.toLowerCase() : "user",
        };
        return prisma.user.create({ data: newUser });
    },
    async update(
        id: number,
        data: Partial<{name: string; email: string; password: string; role: string}>
    ) {
        return prisma.user.update({
            where: { id },
            data
        });
    },
    async delete(id: number) {
        return prisma.user.delete({
            where: { id }
        });
    }
}