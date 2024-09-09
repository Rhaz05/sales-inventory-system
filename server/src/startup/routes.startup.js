import { authRouter } from '../routes/auth.routes.js'
import { positionRouter } from '../routes/position.routes.js'
import { healthRouter } from '../routes/health.routes.js'
import { roleRouter } from '../routes/role.routes.js'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use('/health', healthRouter)
  app.use('/position', positionRouter)
  app.use('/role', roleRouter)
}
