import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookie from 'cookie-parser'
import authRouter from './Routes/user.routes'
import morgan from 'morgan'
const App=express()
App.use(express.json())
App.use(cookie())
App.use(morgan("dev"))
App.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

App.use('/api/auth',authRouter)

export default App