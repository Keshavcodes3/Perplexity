import { Router } from "express";
import {registerUserController,loginUserController,verifyEmail,getMe} from '../Controller/auth.controller'
import { IdentifyUser } from "../Middlewares/auth.middleware";
import { loginValidator, registerValidator } from "../Validators/auth.validator";

const authRouter = Router();



authRouter.post('/register',registerValidator,registerUserController)

authRouter.post('/login',loginValidator,loginUserController)

authRouter.get('/verify-email', verifyEmail)

authRouter.get('/me', IdentifyUser, getMe)

export default authRouter