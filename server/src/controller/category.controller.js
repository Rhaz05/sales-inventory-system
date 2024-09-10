import { SelectAll, Query, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getCategory = async (req, res) => {
  try {
    const response = await SelectAll('product_category')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Categories available' })
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body

    if (!categoryName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM product_category WHERE name = ?`, [categoryName])

    if (exist) {
      return res.status(422).json({ message: 'Category already exist' })
    }

    const response = await Query(`INSERT INTO product_category (name, created_at) VALUES (?, ?)`, [
      categoryName,
      getTimestamp(dateFormat.withSeconds),
    ])

    return res.status(200).json({ message: 'Category created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query(`SELECT * FROM product_category WHERE id = ?`, [id])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Category Not Found' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { categoryName } = req.body

    if (!id || !categoryName) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM product_category WHERE id = ?`, [id])

    if (!exist) {
      return res.status(404).json({ message: 'Category Not Found' })
    }

    await Query(`UPDATE product_category SET name = ? WHERE id = ?`, [categoryName, id])
    return res.status(200).json({ message: 'Category Updated successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
