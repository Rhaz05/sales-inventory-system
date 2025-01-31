import express from 'express'
import {
  getBranch,
  getBranchById,
  createBranch,
  updateBranch,
} from '../controller/branch.controller.js'

export const branchRouter = express.Router()

branchRouter.get('/', getBranch)

branchRouter.get('/:id', getBranchById)

branchRouter.post('/', createBranch)

branchRouter.put('/:id', updateBranch)
