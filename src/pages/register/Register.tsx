/* eslint-disable import/no-unresolved */
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { Link } from 'react-router-dom'
import { rules } from 'src/utils/rules'
interface FormData {
  email: string
  password: string
  confirm_password: string
}

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>()

  const handleRegister: SubmitHandler<FormData> = (data: any) => {
    console.log(data)
  }
  console.log(errors)

  return (
    <div className='h-full bg-primary'>
      <div className='mx-auto max-w-7xl px-4 py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='rounded bg-white p-5 lg:col-span-2 lg:col-start-4'>
            <p className=' text-xl text-black lg:text-2xl'>Đăng Ký</p>
            <form action='' onSubmit={handleSubmit(handleRegister)}>
              <div className='mt-6'>
                <input
                  className='w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow'
                  type='email'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='h-4 text-sm text-red-500'>{errors?.email && errors?.email.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  className='w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow'
                  type='password'
                  placeholder='Password'
                  {...register('password', rules.password)}
                />
                <div className='h-4 text-sm text-red-500'>{errors?.password && errors?.password.message}</div>
              </div>
              <div className='mt-2'>
                <input
                  className='w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow'
                  type='password'
                  placeholder='Confirm Password'
                  {...register('confirm_password', rules.confirm_passoword)}
                />

                <div className='h-4 text-sm text-red-500'>
                  {errors?.confirm_password && errors?.confirm_password.message}
                </div>
              </div>
              <button className=' mt-4 w-full rounded bg-primary p-4 text-white'>Đăng Ký</button>
              <div className='mt-4 text-center text-sm text-gray-500'>
                Bạn đã có tài khoản?{' '}
                <Link className='text-primary' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
