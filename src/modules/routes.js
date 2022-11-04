import HomeRoutes from 'MyModule/home/home-routes'
import AuthRoutes from 'MyModule/auth/auth-routes'

let routes = []

routes.push(...HomeRoutes)
routes.push(...AuthRoutes)

export default routes