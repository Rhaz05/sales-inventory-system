import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getProducts = async (req, res) => {
  try {
    const response = await SelectAll('products')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Products available' })
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productCost,
      productCategoryId,
      barcode,
      productImage,
    } = req.body

    if (!productName || !productPrice || !productCategoryId || !productDescription || !barcode) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM products WHERE name = ?`, [productName])

    if (exist) {
      return res.status(422).json({ message: 'Product already exist' })
    }

    const response = await Query(
      `INSERT INTO products (name, description, price, cost, category_id, barcode, image, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productName,
        productDescription,
        productPrice,
        productCost ? productCost : 0,
        productCategoryId,
        barcode,
        productImage ? productImage : '',
        getTimestamp(dateFormat.withSeconds),
      ]
    )

    return res.status(200).json({ message: 'Product created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query(`SELECT * FROM products WHERE id = ?`, [id])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Product Not Found' })
    }

    return res.status(200).json(response[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
