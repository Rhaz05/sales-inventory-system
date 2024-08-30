import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'

export const getPosition = async (req, res) => {
  try {
    const data = await SelectAll('position', 'p_')
    res.status(200).json(data)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getPositionById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query('SELECT * FROM position WHERE p_id = ?', [id], 'p_')

    if (response.length == 0) {
      return res.status(404).json({ message: 'User Not Found' })
    }

    return res.status(200).json(response)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createPosition = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Create Position' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updatePosition = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Update Position' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
