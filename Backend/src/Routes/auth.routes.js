import { Router } from 'express'
import { registerUserController, loginUserController } from '../Controllers/auth.controller'
import { validateRegister, handleValidationErrors } from '../Validators/registerValidator'
import {verifyEmail} from '../Controllers/auth.controller'
import {IdentifyUser} from '../Middlewares/auth.middleware'
import { getMe } from '../Controllers/auth.controller'
const authRouter = Router()


authRouter.post('/register', validateRegister, handleValidationErrors, registerUserController)

authRouter.get('/verify-email', validateRegister, handleValidationErrors,verifyEmail)

authRouter.post('/login',IdentifyUser, loginUserController)

authRouter.get('/me',IdentifyUser, getMe)

export default authRouter