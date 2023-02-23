import { Logo, Search, Cart } from '../icon'
import Popover from '../popover'
import { useQuery } from '@tanstack/react-query'
import { useApp } from '../../contexts/app.context'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { purchaseStatus } from 'src/constants/purchase'
import { purchaseApi } from 'src/apis/purchase.api'
import noproduct from 'src/assets/images/no-product.png'
import { formatCurrency } from 'src/utils/utils'
import NavHeader from '../navHeader'
import useSearchProducts from 'src/hooks/useSearchProducts'

// type FormData = SearchHeaderSchema
const MAX_PURCHASES = 5
const Header = () => {
  const { isAuthenticated, profile } = useApp()
  const { register, onSubmitSearch } = useSearchProducts()
  const navigate = useNavigate()
  // console.log(isAuthenticated)
  // const { queryConfig } = useQueryConfig()
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid }
  // } = useForm<FormData>({
  //   resolver: yupResolver(searchHeaderSchema),
  //   defaultValues: {
  //     name: ''
  //   }
  // })
  const { data: purchaseIncartData } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart }),
    enabled: isAuthenticated
  })
  const purchasesIncart = purchaseIncartData?.data.data
  // const onSubmitSearch = handleSubmit((data) => {
  //   // console.log(data)
  //   // khi search thì bỏ order và sortby
  //   //  ỏw đây làm đơn giản là lỗi thì ko submit được
  //   if (isValid) {
  //     const config = queryConfig.order
  //       ? omit({ ...queryConfig, name: data.name }, ['sort_by', 'order'])
  //       : { ...queryConfig, name: data.name }
  //     navigate({
  //       pathname: path.home,
  //       search: createSearchParams(config).toString()
  //     })
  //   }
  // })

  return (
    <header className='bg-primary'>
      <NavHeader></NavHeader>
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
                <button
                  className='rounded-sm bg-primary px-4 py-2 capitalize text-white hover:bg-opacity-90'
                  onClick={() => navigate(path.cart)}
                >
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
