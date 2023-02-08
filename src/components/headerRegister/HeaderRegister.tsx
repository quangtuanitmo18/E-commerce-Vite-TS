import { Link } from 'react-router-dom'
import { Logo } from '../icon'
const HeaderRegister = () => {
  return (
    <header>
      <div className='container py-5'>
        <nav className='flex items-end'>
          <Link to={'/'}>
            <Logo></Logo>
          </Link>
          <p className='ml-5 text-xl lg:text-2xl'>Đăng Ký</p>
        </nav>
      </div>
    </header>
  )
}

export default HeaderRegister
