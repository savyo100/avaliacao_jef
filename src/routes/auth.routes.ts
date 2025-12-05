import type { FastifyInstance } from "fastify";
import { authController } from
    "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
    app.post("/login", authController.login);
    app.post("/register", authController.register);
}