import type { FastifyInstance } from "fastify/types/instance";

import { attemptController } from "../controllers/attempt.controller";

export async function attemptRoutes(app: FastifyInstance) {
    app.get("/attempts", attemptController.list);
    app.get("/attempts/:id", attemptController.get);
    app.post("/attempts", attemptController.create);
    app.put("/attempts/:id", attemptController.update);
    app.delete("/attempts/:id", attemptController.delete);
}