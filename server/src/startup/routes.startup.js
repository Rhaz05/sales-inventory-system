import { authRouter } from '../routes/auth.routes.js'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
}
