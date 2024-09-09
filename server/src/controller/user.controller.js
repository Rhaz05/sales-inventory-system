import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { nanoid } from '../util/nano.util.js'
import bcrypt from 'bcryptjs'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getUsers = async (req, res) => {
  try {
    const response = await SelectAll('users')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Users available' })
    }
    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createUser = async (req, res) => {
  try {
    const userId = nanoid()
    const { fullName, userName, password, email, roleId, positionId, branchId } = req.body

    if (!userName || !password || !fullName || !email || !roleId || !positionId || !branchId) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(
      `SELECT * FROM users WHERE user_name = ? OR email = ? OR full_name = ?`,
      [userName, email, fullName]
    )

    if (exist) {
      return res.status(400).json({ message: 'Credentials already exist' })
    }

    const hash = await bcrypt.hash(password, 10)

    await Query(
      `INSERT INTO users (id, full_name, user_name, password, email, role_id, position_id, branch_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        fullName,
        userName,
        hash,
        email,
        roleId,
        positionId,
        branchId,
        getTimestamp(dateFormat.withSeconds),
      ]
    )

    return res.status(200).json({ message: 'User created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
