import express from 'express';
import mongoose from 'mongoose';
import cookie from 'cookie-parser'

import authRouter from './Routes/auth.routes';

const app = express();
app.use(express.json());
app.use(cookie())
app.use('/api/v1/auth',authRouter)

export default app;