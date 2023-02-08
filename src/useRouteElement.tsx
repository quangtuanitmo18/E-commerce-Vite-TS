import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { useApp } from './components/contexts/app.context'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import Login from './pages/login'
import ProductList from './pages/productList'
import Register from './pages/register'

function ProtectedRoute() {
  const { isAuthenticated } = useApp()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
function RejectedRoute() {
  const { isAuthenticated } = useApp()
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: '/',
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
          path: '/profile',
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
      ]
    }
  ])

  return routeElements
}

export default useRouteElement
