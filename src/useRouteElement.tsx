import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useApp } from './contexts/app.context'
import CartLayout from './layouts/cartLayout'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import Cart from './pages/cart'
import Login from './pages/login'
import ProductDetail from './pages/productDetail'
import ProductList from './pages/productList'
import Register from './pages/register'

function ProtectedRoute() {
  const { isAuthenticated } = useApp()
  // const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useApp()
  // const isAuthenticated = false
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
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
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
        },
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
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
