import express from 'express'
import {
  getPosition,
  getPositionById,
  createPosition,
  updatePosition,
} from '../controller/position.controller.js'

export const positionRouter = express.Router()

positionRouter.get('/', getPosition)

positionRouter.get('/:id', getPositionById)

positionRouter.post('/', createPosition)

positionRouter.put('/:id', updatePosition)
