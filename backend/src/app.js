import express from "express"
import { logger } from "./middlewares/logger.js"
import router from "./routes/taskRoutes.js"

const app = (express())

app.use(logger, express.json())

app.use("/tasks", router)

export default app