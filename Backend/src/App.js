import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookie from 'cookie-parser'

const app = express();
app.use(express.json())
app.use(cookie())

//?import routes
import authRouter from "./Routes/user.routes.js";
import conversationRouter from "./Routes/conversation.routes.js";
import projectRoutes from "./Routes/project.routes.js"

//?use routes
app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use('/api/project',projectRoutes)


export default app;