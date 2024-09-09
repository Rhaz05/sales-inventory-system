import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Login successful' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const signup = async (req, res) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    return res.status(200).json({
      message: 'Signup successful',
      user: {
        userName,
        password: hashedPassword,
      },
    })
  } catch (error) {
    console.log(error)
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
