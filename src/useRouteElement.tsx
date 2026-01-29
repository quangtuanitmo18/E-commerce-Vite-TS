import { lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import { useApp } from './contexts/app.context'
import CartLayout from './layouts/cartLayout'
import MainLayout from './layouts/mainLayout'
import RegisterLayout from './layouts/registerLayout'
import UserLayout from './pages/user/layouts'
import { LoadingSpin } from './components/loading'

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

const LoadingFallBack = () => {
  return (
    <div className='flex min-h-[60vh] items-center justify-center'>
      <LoadingSpin></LoadingSpin>
    </div>
  )
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
              <Suspense fallback={<LoadingFallBack />}>
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
                <Suspense fallback={<LoadingFallBack />}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense fallback={<LoadingFallBack />}>
                  <HistoryPurchase />
                </Suspense>
              )
            },
            {
              path: path.changePassword,
              element: (
                <Suspense fallback={<LoadingFallBack />}>
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
              <Suspense fallback={<LoadingFallBack />}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<LoadingFallBack />}>
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
          <Suspense fallback={<LoadingFallBack />}>
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
          <Suspense fallback={<LoadingFallBack />}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense fallback={<LoadingFallBack />}>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])

  return routeElements
}

export default useRouteElement
