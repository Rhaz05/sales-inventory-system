import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getRole = async (req, res) => {
  try {
    const response = await SelectAll('role')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Roles available' })
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query(`SELECT * FROM role WHERE id = ?`, [id])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Role Not Found' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createRole = async (req, res) => {
  try {
    const { roleName } = req.body

    if (!roleName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM role WHERE name = ?`, [roleName])

    if (exist) {
      return res.status(422).json({ message: 'Role already exist' })
    }

    const response = await Query(`INSERT INTO role (name, created_at) VALUES (?, ?)`, [
      roleName,
      getTimestamp(dateFormat.withSeconds),
    ])

    return res.status(200).json({ message: 'Role created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateRole = async (req, res) => {
  try {
    const { id } = req.params
    const { roleName } = req.body

    if (!id || !roleName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM role WHERE id = ?`, [id])

    if (!exist) {
      return res.status(404).json({ message: 'Role Not Found' })
    }

    await Query(`UPDATE role SET name = ? WHERE id = ?`, [roleName, id])
    return res.status(200).json({ message: 'Role Updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
