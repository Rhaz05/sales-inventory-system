import express from 'express'
import { CONFIG } from './src/config/env.config.js'
import { logger } from './src/util/logger.util.js'
import { loggerMiddleware } from './src/middlewares/logger.middleware.js'
import { initRoutes } from './src/startup/routes.startup.js'
import { initStaticFiles } from './src/startup/staticFiles.startup.js'
import { initDocs } from './src/startup/docs.startup.js'
import { initSession } from './src/startup/session.startup.js'
import { checkConnection } from './src/database/sql.database.js'

const app = express()

const serverStart = async () => {
  logger.info('--------------------Server Starting--------------------')
  logger.info(`Server running on ${CONFIG.NODE_ENVIRONMENT.toUpperCase()} mode`)

  logger.info('Adding req body json parser')
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  logger.info('Adding logger middleware')
  app.use(loggerMiddleware)

  logger.info('Stablishing database connection')
  checkConnection()

  logger.info('Initializing session')
  initSession(app)

  logger.info('Initializing routes')
  initRoutes(app)

  logger.info('Initializing docs')
  initDocs(app)

  const server = app.listen(CONFIG.NODE_PORT, () => {
    logger.info(`Server listening on port ${CONFIG.NODE_PORT}`)
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
