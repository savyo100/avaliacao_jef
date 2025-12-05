import type { FastifyReply, FastifyRequest } from
    "fastify"
import { userService } from "../services/user.service"

export const userController = {

    async list(_req: FastifyRequest, reply: FastifyReply) {
        const users = await userService.getAll()
        return reply.send(users)
    },

    async get(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const user = await userService.getById(Number(id))
        if (!user) {
            return reply.status(404).send({ message: "Usuário não encontrado" })
        }
        return reply.send(user)
    },
    async create(req: FastifyRequest, reply: FastifyReply) {
        const data = req.body as any
        try {
            const newUser = await userService.create(data)
            return reply.status(201).send(newUser)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar usuário" })
        }
    },

    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const data = req.body as any
        try {
            const updatedUser = await userService.update(Number(id), data)
            if (!updatedUser) {
                return reply.status(404).send({ message: "Usuário não encontrado" })
            }
            return reply.send(updatedUser)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao atualizar usuário" })
        }
    },
    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        try {
            const deleted = await userService.delete(Number(id))
            if (!deleted) {
                return reply.status(404).send({ message: "Usuário não encontrado" })
            }
            return reply.send({ message: "Usuário deletado com sucesso" })
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao deletar usuário" })
        }
    }
};