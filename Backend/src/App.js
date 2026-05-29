import 'dotenv/config'
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
const app = express();
app.use(morgan('dev'))

// CORS configuration supporting localhost origins
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    credentials: true,
}));

app.use(express.json())
app.use(cookieParser())

// Debug logging middleware for incoming requests
app.use((req, res, next) => {
    console.log(`[Backend Debug] Incoming request: ${req.method} ${req.originalUrl || req.url}`);
    next();
});

//?import routes
import authRouter from "./Routes/user.routes.js";
import conversationRouter from "./Routes/conversation.routes.js";
import projectRoutes from "./Routes/project.routes.js"
import adminRouter from "./Routes/admin.routes.js";
import { apiRateLimit } from "./Middlewares/rateLimit.middleware.js";

// Specific GET route for health checks (prevents blocking subsequent api routes)
app.get('/health', (req, res) => {
    res.status(200).send("Health is good");
});

//?use routes
app.use("/api", apiRateLimit);
app.use("/api/auth", authRouter);
app.use("/api/conversations", conversationRouter);
app.use('/api/project', projectRoutes)
app.use("/api/admin", adminRouter);


export default app;
