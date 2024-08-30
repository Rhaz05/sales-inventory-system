import { authRouter } from '../routes/auth.routes.js'
import { positionRouter } from '../routes/position.routes.js'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use('/position', positionRouter)
}
