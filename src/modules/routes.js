import HomeRoutes from 'MyModule/home/home-routes'
import AuthRoutes from 'MyModule/auth/auth-routes'
import DashboardRoutes from 'MyModule/dashboard/dashboard-routes'

let routes = []

routes.push(...HomeRoutes)
routes.push(...AuthRoutes)
routes.push(...DashboardRoutes)

export default routes