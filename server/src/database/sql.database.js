import mysql from 'mysql2/promise'
import { CONFIG } from '../config/env.config.js'
import { Normalize } from '../util/util.js'

const pool = mysql.createPool({
  host: CONFIG.DB_HOST,
  user: CONFIG.DB_USER,
  password: CONFIG.DB_PASSWORD,
  database: CONFIG.DB_SCHEMA,
  multipleStatements: true,
})

export const checkConnection = async () => {
  try {
    const connection = await pool.getConnection()
    await connection.ping() // Ping the server to check connection
    connection.release() // Release the connection back to the pool
    return true
  } catch (error) {
    console.error('Error checking connection:', error)
    return false
  }
}

//@use for Checking if data exist
export const Check = async (sql, params = []) => {
  try {
    const [result] = await pool.query(sql, params)
    if (result.length != 0) {
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

//@ Specific Select ALL no params
export const SelectAll = async (tableName, prefix) => {
  try {
    const [result] = await pool.query(`SELECT * FROM ${tableName}`)
    if (prefix) {
      const data = Normalize(result, prefix)
      return data
    }
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

//@ can be used for universal query SELECT, INSERT, UPDATE, DELETE
export const Query = async (sql, params = [], prefix) => {
  try {
    const [result] = await pool.query(sql, params)
    if (sql.trim().toUpperCase().startsWith('INSERT')) {
      return { ...result, insertId: result.insertId }
    }
    if (prefix && sql.trim().toUpperCase().startsWith('SELECT')) {
      const data = Normalize(result, prefix)
      return data
    }
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}

//@use for Transac and Commit
export const Transaction = async (queries) => {
  let connection
  try {
    connection = await pool.getConnection()
    await connection.beginTransaction()

    const queryPromises = queries.map((query) => {
      return connection.execute(query.sql, query.values)
    })

    await Promise.all(queryPromises)
    await connection.commit()
    return true
  } catch (error) {
    if (connection) {
      await connection.rollback()
    }
    console.error('Error executing transaction:', error)
    throw error
  } finally {
    if (connection) {
      connection.release()
    }
  }
}
