import express from 'express'

export const authRouter = express.Router()

authRouter.post('/', (req, res) => {
  res.status(200).json({ message: 'Login successful' })
})
