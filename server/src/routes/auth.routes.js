import express from 'express'
import { login, signup } from '../controller/auth.controller.js'

export const authRouter = express.Router()

authRouter.post('/', login)

authRouter.post('/signup', signup)
