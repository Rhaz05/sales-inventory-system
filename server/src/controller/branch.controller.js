import { Query, SelectAll, Check, Transaction } from '../database/sql.database.js'
import { logger } from '../util/logger.util.js'
import { getTimestamp, dateFormat } from '../util/date.util.js'

export const getBranch = async (req, res) => {
  try {
    const response = await SelectAll('branch')
    if (response.length == 0) {
      return res.status(404).json({ message: 'No Branches available' })
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getBranchById = async (req, res) => {
  try {
    const { id } = req.params
    const response = await Query(`SELECT * FROM branch WHERE id = ?`, [id])

    if (response.length == 0) {
      return res.status(404).json({ message: 'Branch Not Found' })
    }

    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const createBranch = async (req, res) => {
  try {
    let queries = []
    const { branchName, branchAddress, branchContact, branchEmail } = req.body

    if (!branchName || !branchAddress || !branchContact || !branchEmail) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const exist = await Check(`SELECT * FROM branch WHERE name = ?`, [branchName])

    if (exist) {
      return res.status(400).json({ message: 'Branch already exist' })
    }

    const response = await Query(
      `INSERT INTO branch (name, address, contact, email, created_at) VALUES (?, ?, ?, ?, ?)`,
      [branchName, branchAddress, branchContact, branchEmail, getTimestamp(dateFormat.withSeconds)]
    )
    const { insertId } = response

    const products = await SelectAll('products')

    products.forEach(async (product) => {
      const { id } = product
      const inventoryID = `${insertId}${id}`

      const exist = await Check(`SELECT * FROM product_inventory WHERE inventory_id = ?`, [
        inventoryID,
      ])

      if (!exist) {
        queries.push({
          sql: `INSERT INTO product_inventory (inventory_id, product_id, branch_id, quantity) VALUES (?, ?, ?, ?)`,
          values: [inventoryID, id, insertId, 0],
        })
      }
    })

    await Transaction(queries)

    return res.status(200).json({ message: 'Branch created successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// export const updateBranch = async (req, res) => {
//   try {
//     const { id } = req.params
//     const { branchName } = req.body

//     if (!id || !branchName) {
//       return res.status(400).json({ message: 'All fields are required' })
//     }

//     const exist = await Check(`SELECT * FROM branch WHERE id = ?`, [id])

//     if (!exist) {
//       return res.status(404).json({ message: 'Branch Not Found' })
//     }

//     await Query(`UPDATE branch SET name = ? WHERE id = ?`, [branchName, id])
//     return res.status(200).json({ message: 'Branch Updated successfully' })
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ message: 'Internal Server Error' })
//   }
// }
