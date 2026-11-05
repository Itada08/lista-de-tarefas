import express from "express"
import { logger } from "./middlewares/logger.js"
import router from "./routes/taskRoutes.js"
import errorHandler from "./middlewares/errorHandler.js"

const app = (express())

app.use(logger, express.json())

app.use("/tasks", router)

app.use(errorHandler);

export default app