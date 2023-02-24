import { Link, NavLink } from 'react-router-dom'
import path from 'src/constants/path'
import { useApp } from 'src/contexts/app.context'
import userImgDefault from 'src/assets/images/user-default.png'
import classNames from 'classnames'
import { getAvatarUrl } from 'src/utils/utils'

const listLink = [
  {
    id: 1,
    link: path.profile,
    icon: 'https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4',
    name: 'Tài khoản của tôi'
  },
  {
    id: 2,
    link: path.changePassword,
    icon: 'https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4',
    name: 'Đổi mật khẩu'
  },
  {
    id: 3,
    link: path.historyPurchase,
    icon: 'https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078',
    name: 'Đơn hàng'
  }
]

export default function UserSideNav() {
  const { profile } = useApp()
  // console.log(profile)
  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-black/10'>
          <img src={getAvatarUrl(profile?.avatar)} alt='' className='h-full w-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>{profile?.name}</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7'>
        {listLink.map((item) => (
          <NavLink
            key={item.id}
            to={item.link}
            className={({ isActive }) =>
              classNames('text-orange flex items-center capitalize transition-colors', {
                'text-primary': isActive,
                'text-gray-500': !isActive
              })
            }
          >
            <div className='mr-3 h-[22px] w-[22px]'>
              <img src={item.icon} alt='' className='h-full w-full' />
            </div>
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
