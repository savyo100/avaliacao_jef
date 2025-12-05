import type { FastifyReply, FastifyRequest } from
    "fastify"
import { wordOfTheDayService } from "../services/wordOfTheDay.service"

export const WordOfTheDayController = {

    async list(_req: FastifyRequest, reply: FastifyReply) {
        const words = await wordOfTheDayService.getAll()
        return reply.send(words)
    },

    async get(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const word = await wordOfTheDayService.getById(Number(id))
        return reply.send(word)
    },
    async create(req: FastifyRequest, reply: FastifyReply) {
        const { word, definition } = req.body as any
        try {
            const newWord = await wordOfTheDayService.create({ word, definition })
            return reply.status(201).send(newWord)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar palavra do dia" })
        }
    },
    async update(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const data = req.body as any
        try {
            const updatedWord = await wordOfTheDayService.update(Number(id), data)
            return reply.send(updatedWord)
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao atualizar palavra do dia" })
        }
    },
    async delete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        try {
            await wordOfTheDayService.delete(Number(id))
            return reply.status(204).send()
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao deletar palavra do dia" })
        }
    }
};