import express from 'express'
import {
  getCategory,
  createCategory,
  getCategoryById,
  updateCategory,
} from '../controller/category.controller.js'

export const categoryRouter = express.Router()

categoryRouter.get('/', getCategory)

categoryRouter.post('/', createCategory)

categoryRouter.get('/:id', getCategoryById)

categoryRouter.put('/:id', updateCategory)
