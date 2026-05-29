import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookie from 'cookie-parser'
import morgan from 'morgan'
const app = express();
app.use(morgan('dev'))
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
}));

app.use(express.json())
app.use(cookie())

//?import routes
import authRouter from "./Routes/user.routes.js";
import conversationRouter from "./Routes/conversation.routes.js";
import projectRoutes from "./Routes/project.routes.js"
import adminRouter from "./Routes/admin.routes.js";
import { apiRateLimit } from "./Middlewares/rateLimit.middleware.js";

//?use routes
app.use("/api", apiRateLimit);
app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use('/api/project', projectRoutes)
app.use("/api/admin", adminRouter);


export default app;
