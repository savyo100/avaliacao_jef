import type { FastifyInstance } from "fastify";

import { WordOfTheDayController } from "../controllers/wordOfTheDay.controller";

export async function wordOfTheDayRoutes(app: FastifyInstance) {
    app.get("/wordOfTheDay", WordOfTheDayController.list);
    app.get("/wordOfTheDay/:id", WordOfTheDayController.get);
    app.post("/wordOfTheDay", WordOfTheDayController.create);
    app.put("/wordOfTheDay/:id", WordOfTheDayController.update);
    app.delete("/wordOfTheDay/:id", WordOfTheDayController.delete);
}