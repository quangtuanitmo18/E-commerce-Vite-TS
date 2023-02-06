import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/registerLayout'
import Login from './pages/login'
import ProductList from './pages/productList'
import Register from './pages/register'

const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
      // children: [
      //   {
      //     path: 'messages',
      //     element: <DashboardMessages />
      //   },
      //   { path: 'tasks', element: <DashboardTasks /> }
      // ]
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register></Register>
        </RegisterLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElement
