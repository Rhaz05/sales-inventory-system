import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const initStaticFiles = (app) => {
  app.use(express.static(path.join(__dirname, '..', '..', 'public')))

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'src/views', 'index.html'))
  })
  
  app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '..', '..', 'src/views', '404.html'))
    } else if (req.accepts('json')) {
      res.json({
        message: '404 Not Found',
      })
    } else {
      res.type('txt').send('404 Not Found')
    }
  })
}
