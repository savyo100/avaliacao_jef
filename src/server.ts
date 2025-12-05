import "dotenv/config"
import "./lib/prisma"
import Fastify from 'fastify'
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import { authMiddleware } from './middlewares/auth'
import { authRoutes } from './routes/auth.routes'
import { wordOfTheDayRoutes } from './routes/wordOfTheDay.routes'
import { attemptRoutes } from './routes/attempt.routes'
import { userRoutes } from './routes/user.routes'

const app = Fastify({ logger: true })


app.register(swagger, {
  swagger: {
    info: {
      title: "API de Usuários",
      description: "Documentação da API com Fastify + Swagger",
      version: "1.0.0",
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});


app.register(swaggerUI, {
  routePrefix: "/docs",
  staticCSP: true,
  transformStaticCSP: (header) => header,
})


app.register(userRoutes)

app.register(wordOfTheDayRoutes)

app.register(authRoutes)

app.register(attemptRoutes)
app.get("/me", { preHandler: authMiddleware },
  async (req, reply) => {
    return reply.send({ user: (req as any).user });
  });

app.listen({ port: 3333 })
  .then(address => {
    console.log(`🚀 Servidor rodando em: ${address}`)
    console.log("📘 Documentação Swagger disponível em: http://localhost:3333/docs")
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })
