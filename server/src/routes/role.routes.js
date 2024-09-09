import express from 'express'
import { getRole, getRoleById, createRole, updateRole } from '../controller/role.controller.js'

export const roleRouter = express.Router()

roleRouter.get('/', getRole)

roleRouter.get('/:id', getRoleById)

roleRouter.post('/', createRole)

roleRouter.put('/:id', updateRole)
