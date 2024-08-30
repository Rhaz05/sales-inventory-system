import express from 'express'
import { getPositions } from '../controller/position.controller.js'

export const positionRouter = express.Router()

positionRouter.get('/', getPositions)
