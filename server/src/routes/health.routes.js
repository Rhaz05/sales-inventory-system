import express from 'express'
import { getHealth } from '../controller/health.controller.js'

export const healthRouter = express.Router()

healthRouter.get('/', getHealth)
