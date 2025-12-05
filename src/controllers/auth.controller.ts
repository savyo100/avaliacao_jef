import type { FastifyReply, FastifyRequest } from
    "fastify";
import { userService } from "../services/user.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = process.env.JWT_SECRET || "MEU_SEGREDO_SUPER_SEGURO";
if (!process.env.JWT_SECRET) {
    console.warn('WARNING: using fallback JWT secret. Set JWT_SECRET in environment for production.');
}
export const authController = {
    async register(req: FastifyRequest, reply:
        FastifyReply) {
        const { name, email, password, role } = req.body as any;

        const userExists = await
            userService.findByEmail(email);
        if (userExists) {
            return reply.status(400).send({ error: "Email já cadastrado" });
        }

        const user = await userService.register(name, email,
            password, role);

        return reply.status(201).send({
            message: "Usuário criado com sucesso",
            user: { id: user.id, email: user.email, name: user.name, role: user.role }

        });
    },

    async login(req: FastifyRequest, reply:
        FastifyReply) {
        const { email, password } = req.body as any;

        const user = await
            userService.findByEmail(email);
        if (!user) {
            return reply.status(401).send({
                error:
                    "Credenciais inválidas"
            });
        }

        const passwordMatch = await
            bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return reply.status(401).send({ error: "Senha inválida" });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            SECRET,
            { expiresIn: "1h" }
        );

        return reply.send({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
};