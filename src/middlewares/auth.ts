import type { FastifyReply, FastifyRequest } from
    "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "MEU_SEGREDO_SUPER_SEGURO";
if (!process.env.JWT_SECRET) {
    console.warn('WARNING: using fallback JWT secret. Set JWT_SECRET in environment for production.');
}

export async function authMiddleware(
    req: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return reply.status(401).send({
                error: "Token não enviado"
            });
        }

        const token = authHeader.replace("Bearer ","");

        const decoded = jwt.verify(token, SECRET);

        (req as any).user = decoded;
    } catch (err) {
        return reply.status(401).send({
            error: "Token inválido"
        });
    }
}