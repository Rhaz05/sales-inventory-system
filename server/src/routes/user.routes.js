import express from 'express'
import { getUsers, createUser } from '../controller/user.controller.js'

export const userRouter = express.Router()

userRouter.get('/', getUsers)

userRouter.post('/', createUser)
