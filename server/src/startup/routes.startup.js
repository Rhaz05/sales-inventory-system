import { authRouter } from '../routes/auth.routes.js'
import { positionRouter } from '../routes/position.routes.js'
import { healthRouter } from '../routes/health.routes.js'
import { roleRouter } from '../routes/role.routes.js'
import { branchRouter } from '../routes/branch.routes.js'
import { userRouter } from '../routes/user.routes.js'
import { auth } from '../middlewares/auth.middleware.js'

export const initRoutes = (app) => {
  app.use('/auth', authRouter)
  app.use(auth)
  app.use('/health', healthRouter)
  app.use('/position', positionRouter)
  app.use('/role', roleRouter)
  app.use('/branch', branchRouter)
  app.use('/user', userRouter)
}
