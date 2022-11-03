import HomeRoutes from './home/home-routes'
import AuthRoutes from './auth/auth-routes'

let routes = []

routes.push(...HomeRoutes)
routes.push(...AuthRoutes)

export default routes