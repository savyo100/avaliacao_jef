import type { FastifyInstance } from "fastify";

import { userController } from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
    app.get("/users", userController.list);
    app.get("/users/:id", userController.get);
    app.post("/users", userController.create);
    app.put("/users/:id", userController.update);
    app.delete("/users/:id", userController.delete);
}