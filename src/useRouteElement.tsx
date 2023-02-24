import { profile } from 'console'
import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useApp } from './contexts/app.context'
import CartLayout from './layouts/cartLayout'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import UserLayout from './pages/user/layouts'

const Login = lazy(() => import('./pages/login'))
const Register = lazy(() => import('./pages/register'))
const Cart = lazy(() => import('./pages/cart'))
const NotFound = lazy(() => import('./pages/notFound'))
const ProductDetail = lazy(() => import('./pages/productDetail'))
const ProductList = lazy(() => import('./pages/productList'))
const Profile = lazy(() => import('./pages/user/pages/profile'))
const ChangePassword = lazy(() => import('./pages/user/pages/changePassword'))
const HistoryPurchase = lazy(() => import('./pages/user/pages/historyPurchase'))

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
              <Suspense fallback={<div>...Loading</div>}>
                <Cart />
              </Suspense>
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
              element: (
                <Suspense fallback={<div>...Loading</div>}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense fallback={<div>...Loading</div>}>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense fallback={<div>...Loading</div>}>
                  <ChangePassword />
                </Suspense>
              )
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
              <Suspense fallback={<div>...Loading</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>...Loading</div>}>
                <Register></Register>
              </Suspense>
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
          <Suspense fallback={<div>...Loading</div>}>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <Suspense fallback={<div>...Loading</div>}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense fallback={<div>...Loading</div>}>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElement
