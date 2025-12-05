import type { FastifyReply, FastifyRequest } from
    "fastify"
import { attemptService } from "../services/attempt.service"

export const attemptController = {

    async list(_req: FastifyRequest, reply: FastifyReply) {
        const attempts = await attemptService.getAll()
        return reply.send(attempts)
    },

    async get(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const attempt = await attemptService.getById(Number(id))
        if (!attempt) {
            return reply.status(404).send({ message: "Tentativa não encontrada" })
        }
        return reply.send(attempt)
    },
    async create(req: FastifyRequest, reply: FastifyReply) {
        const { userId, word, similarity, rank } = req.body as any
        try {
            const newAttempt = await attemptService.create({ userId, word, similarity, rank })
            return reply.status(201).send(newAttempt)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar tentativa" })
        }
    },

    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const data = req.body as any
        try {
            const updatedAttempt = await attemptService.update(Number(id), data)
            if (!updatedAttempt) {
                return reply.status(404).send({ message: "Tentativa não encontrada" })
            }
            return reply.send(updatedAttempt)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao atualizar tentativa" })
        }
    },
    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        try {
            const deleted = await attemptService.delete(Number(id))
            if (!deleted) {
                return reply.status(404).send({ message: "Tentativa não encontrada" })
            }
            return reply.send({ message: "Tentativa deletada com sucesso" })
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao deletar tentativa" })
        }
    }
};