import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useApp } from './contexts/app.context'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import Login from './pages/login'
import ProductList from './pages/productList'
import Register from './pages/register'

function ProtectedRoute() {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useApp()
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <ProductList />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register></Register>
            </RegisterLayout>
          )
        }
      ]
    }
  ])

  return routeElements
}

export default useRouteElement
