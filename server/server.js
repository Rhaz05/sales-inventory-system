import express from 'express'
import { logger } from './src/util/logger.util.js'
import { loggerMiddleware } from './src/middlewares/logger.middleware.js'
import { initRoutes } from './src/startup/routes.startup.js'
import { initStaticFiles } from './src/startup/staticFiles.startup.js'

const app = express()

const serverStart = () => {
  logger.info('--------------------Server starting--------------------')
  logger.info('Server running on development mode')

  logger.info('Adding logger middleware')
  app.use(loggerMiddleware)

  logger.info('Initializing routes')
  initRoutes(app)

  const server = app.listen(3090, () => {
    logger.info(`Server listening on port ${3090}`)
  })

  logger.info('Serving static files')
  initStaticFiles(app)

  process.on('SIGINT', () => {
    logger.info('SIGINT signal received, Closing the application')
    server.close()
    logger.info('--------------------Server Closed----------------------')
    process.exit(0)
  })
}

serverStart()
