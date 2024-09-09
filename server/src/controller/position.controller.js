import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getPosition = async (req, res) => {
  try {
    const response = await SelectAll('position')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Positions available' })
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getPositionById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query(`SELECT * FROM position WHERE id = ?`, [id])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Position Not Found' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createPosition = async (req, res) => {
  try {
    const { positionName } = req.body

    if (!positionName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM position WHERE name = ?`, [positionName])

    if (exist) {
      return res.status(422).json({ message: 'Position already exist' })
    }

    const response = await Query('INSERT INTO `position` (name, created_at) VALUES (?, ?)', [
      positionName,
      getTimestamp(dateFormat.withSeconds),
    ])

    return res.status(200).json({ message: 'Position created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params
    const { positionName } = req.body

    if (!id || !positionName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM position WHERE id = ?`, [id])

    if (!exist) {
      return res.status(404).json({ message: 'Position Not Found' })
    }

    await Query(`UPDATE position SET name = ? WHERE id = ?`, [positionName, id])
    return res.status(200).json({ message: 'Position Updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
