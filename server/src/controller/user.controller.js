import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { nanoid } from '../util/nano.util.js'

export const getUsers = async (req, res) => {
  try {
    const response = await SelectAll('user', 'u_')
    res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createUser = async (req, res) => {
  try {
    const { userName, password } = req.body

    if (!userName || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const hash = await bcrypt.hash(password, '10')

    const userId = nanoid()

    // await Query('INSERT INTO user (u_id, u_fullName, u_userName, u_password, u_accessType, u_position)')

    return res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
