import express from "express";
import { registerUser, loginUser, getUser, verifyEmail } from "../Controllers/user.controller.js";
import { IdentifyUser } from "../Middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/user", IdentifyUser, getUser);
authRouter.get("/verify-email/:token", verifyEmail);

export default authRouter;