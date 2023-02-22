import { Logo, Search, Cart } from '../icon'
import Popover from '../popover'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useApp } from '../../contexts/app.context'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { authApi } from 'src/apis/auth.api'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { useForm } from 'react-hook-form'
import { searchHeaderSchema, SearchHeaderSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import { purchaseStatus } from 'src/constants/purchase'
import { purchaseApi } from 'src/apis/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'

type FormData = SearchHeaderSchema
const MAX_PURCHASES = 5
const Header = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useApp()
  // console.log(isAuthenticated)
  const { queryConfig } = useQueryConfig()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(searchHeaderSchema),
    defaultValues: {
      name: ''
    }
  })
  // console.log(errors)
  // console.log(isAuthenticated)
  // console.log(profile)
  const { data: purchaseIncartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchasesIncart = purchaseIncartData?.data.data

  const LogoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    // console.log(data)
    // khi search thì bỏ order và sortby
    //  ỏw đây làm đơn giản là lỗi thì ko submit được
    if (isValid) {
      const config = queryConfig.order
        ? omit({ ...queryConfig, name: data.name }, ['sort_by', 'order'])
        : { ...queryConfig, name: data.name }
      navigate({
        pathname: path.home,
        search: createSearchParams(config).toString()
      })
    }
  })

  return (
    <header className='bg-primary'>
      <div className='container flex justify-end gap-4  p-5 text-white'>
        <Popover
          renderPopover={
            <>
              <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path d='M1.33398 8H14.6673' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <span>Tiếng Việt</span>
              <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='currentColor'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                  fill='currentColor'
                />
              </svg>
            </>
          }
        >
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col gap-2 px-3 py-2'>
              <button className='py-2 px-3 hover:text-primary'>Tiếng Việt</button>
              <button className='py-2 px-3 hover:text-primary'>English</button>
            </div>
          </div>
        </Popover>
        {isAuthenticated ? (
          <Popover
            renderPopover={
              <div className='flex cursor-pointer items-center gap-2'>
                <img src='https://source.unsplash.com/random' className='h-5 w-5 rounded-full object-cover' alt='' />
                <span>{profile?.email}</span>
              </div>
            }
          >
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <div className='flex flex-col gap-2 px-3 py-2'>
                <button className='py-2 px-3 hover:text-primary'>Profile</button>
                <button className='py-2 px-3 hover:text-primary' onClick={() => LogoutMutation.mutate()}>
                  Đăng Xuất
                </button>
              </div>
            </div>
          </Popover>
        ) : (
          <>
            <Link to={path.login}>Đăng Nhập </Link> | <Link to={path.register}>Đăng Ký</Link>
          </>
        )}
      </div>
      <div className='container grid grid-cols-12 gap-4 bg-primary p-5'>
        <div className='col-span-2'>
          <Link to={path.home}>
            <Logo className='!fill-white'></Logo>
          </Link>
        </div>
        <div className='col-span-9 '>
          <form className='flex rounded-sm bg-white p-1' action='' onSubmit={onSubmitSearch}>
            <input className='flex-1 outline-none' type='text' placeholder='Tìm kiếm sản phẩm' {...register('name')} />
            <button className='flex flex-shrink-0 items-center justify-center rounded-sm  bg-primary py-2 px-6'>
              <Search className='text-white'></Search>
            </button>
          </form>
        </div>
        <div className='col-span-1 flex cursor-pointer items-center justify-center'>
          <Popover renderPopover={<Cart className='text-white '></Cart>}>
            <div className='relative max-w-xl rounded-sm border border-gray-200 bg-white p-3 shadow-md'>
              <p className='text-gray-500'>Sản phẩm mới thêm</p>
              <div className='mt-5'>
                {purchasesIncart?.length ? (
                  purchasesIncart.slice(0, MAX_PURCHASES).map((purchase) => (
                    <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                      <div className='flex-shrink-0'>
                        <img
                          src={purchase.product.image}
                          alt={purchase.product.name}
                          className='h-11 w-11 object-cover'
                        />
                      </div>
                      <div className='ml-2 flex-grow overflow-hidden'>
                        <div className='truncate'>{purchase.product.name}</div>
                      </div>
                      <div className='ml-2 flex-shrink-0'>
                        <span className='text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex h-[300px] w-[300px] items-center justify-center p-2'>
                    <img src={noproduct} alt='no purchase' className='h-24 w-24' />
                    <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                  </div>
                )}
              </div>
              <div className='mt-6 flex items-center justify-between'>
                <div className='text-xs capitalize text-gray-500'>
                  {purchasesIncart &&
                    (purchasesIncart.length > MAX_PURCHASES ? purchasesIncart.length - MAX_PURCHASES : '')}
                  Thêm hàng vào giỏ
                </div>
                <button className='rounded-sm bg-primary px-4 py-2 capitalize text-white hover:bg-opacity-90'>
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Header
