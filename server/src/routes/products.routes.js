import express from 'express'
import { getProducts, createProduct, getProductById } from '../controller/products.controller.js'

export const productsRouter = express.Router()

productsRouter.get('/', getProducts)

productsRouter.post('/', createProduct)

productsRouter.get('/:id', getProductById)
