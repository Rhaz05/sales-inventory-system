import { authRouter } from '../routes/auth.routes.js'
import { positionRouter } from '../routes/position.routes.js'
import { healthRouter } from '../routes/health.routes.js'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use('/health', healthRouter)
  app.use('/position', positionRouter)
}
