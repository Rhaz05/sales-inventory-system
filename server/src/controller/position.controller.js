import { Query, SelectAll, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'

export const getPositions = async (req, res) => {
  try {
    const data = await SelectAll('position', 'p_')
    res.status(200).json(data)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
