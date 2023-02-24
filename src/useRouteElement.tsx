import { profile } from 'console'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useApp } from './contexts/app.context'
import CartLayout from './layouts/cartLayout'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import Cart from './pages/cart'
import Login from './pages/login'
import NotFound from './pages/notFound'
import ProductDetail from './pages/productDetail'
import ProductList from './pages/productList'
import Register from './pages/register'
import UserLayout from './pages/user/layouts'
import ChangePassword from './pages/user/pages/changePassword'
import HistoryPurchase from './pages/user/pages/historyPurchase'
import Profile from './pages/user/pages/profile'

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
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout></UserLayout>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            },
            {
              path: path.changePassword,
              element: <ChangePassword />
            }
          ]
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
    },
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
      path: '*',
      element: (
        <MainLayout>
          <NotFound />
        </MainLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElement
