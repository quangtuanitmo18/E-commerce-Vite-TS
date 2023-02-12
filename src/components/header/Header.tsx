import { Logo, Search, Cart } from '../icon'
import Popover from '../popover'
import { useMutation } from '@tanstack/react-query'
import { logout } from 'src/apis/auth.api'
import { useApp } from '../../contexts/app.context'
import { Link } from 'react-router-dom'
import path from 'src/constants/path'
import { clearLS, setProfileToLS } from 'src/utils/app'

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useApp()
  // console.log(isAuthenticated)
  console.log(profile)
  const LogoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
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
          <Logo className='fill-white'></Logo>
        </div>
        <div className='col-span-9 flex rounded-sm bg-white p-1'>
          <input className='flex-1 outline-none' type='text' placeholder='Tìm kiếm sản phẩm' />
          <button className='flex flex-shrink-0 items-center justify-center rounded-sm  bg-primary py-2 px-6'>
            <Search className='text-white'></Search>
          </button>
        </div>
        <div className='col-span-1 flex cursor-pointer items-center justify-center'>
          <Popover renderPopover={<Cart className='text-white '></Cart>}>
            <div className='relative max-w-xl rounded-sm border border-gray-200 bg-white p-3 shadow-md'>
              <p className='text-gray-500'>Sản phẩm mới thêm</p>
              <div className='mt-4 flex flex-col gap-3 overflow-hidden'>
                <div className='flex gap-3'>
                  <img
                    src='https://source.unsplash.com/random'
                    className='h-10 w-10 flex-shrink-0 object-cover'
                    alt=''
                  />
                  <p className='truncate'>Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand - AO_THUN_DVR (V427)</p>
                  <span className='text-primary'>599.000</span>
                </div>
                <div className='flex gap-3'>
                  <img
                    src='https://source.unsplash.com/random'
                    className='h-10 w-10 flex-shrink-0   object-cover'
                    alt=''
                  />
                  <p className='truncate'>Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand - AO_THUN_DVR (V427)</p>
                  <span className='text-primary'>599.000</span>
                </div>
                <div className='flex gap-3'>
                  <img
                    src='https://source.unsplash.com/random'
                    className='h-10 w-10 flex-shrink-0  object-cover'
                    alt=''
                  />
                  <p className='truncate'>Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand - AO_THUN_DVR (V427)</p>
                  <span className='text-primary'>599.000</span>
                </div>
                <div className='flex gap-3'>
                  <img
                    src='https://source.unsplash.com/random'
                    className='h-10 w-10 flex-shrink-0 object-cover'
                    alt=''
                  />
                  <p className='truncate'>Tee basic ss1 CREWZ áo thun tay lỡ unisex Local Brand - AO_THUN_DVR (V427)</p>
                  <span className='text-primary'>599.000</span>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <p className='text-gray-500'>Thêm vào giỏ hàng</p>
                <button className='rounded-sm bg-primary px-4 py-2 text-white'> Xem giỏ hàng</button>
              </div>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Header
