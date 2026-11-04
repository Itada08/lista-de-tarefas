import express from "express"
import { logger } from "./middlewares/logger.js"

const app = (express())

app.use(logger, express.json())


app.get("/", (req, res) => {
    res.send("Servidor Rodando!")
})

export default app