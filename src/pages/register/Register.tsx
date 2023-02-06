/* eslint-disable import/no-unresolved */
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { Link } from 'react-router-dom'
import Input from 'src/components/input'
import { RegisterSchema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }
type FormData = RegisterSchema

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const handleRegister: SubmitHandler<FormData> = (data: any) => {
    console.log(data)
  }
  // console.log(errors)

  return (
    <div className='h-full bg-primary'>
      <div className='container max-w-7xl py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='rounded bg-white p-5 lg:col-span-2 lg:col-start-4'>
            <p className=' text-xl text-black lg:text-2xl'>Đăng Ký</p>
            <form action='' onSubmit={handleSubmit(handleRegister)}>
              <Input
                type='email'
                placeholder='Email'
                register={register}
                errorMessage={errors?.email ? errors?.email.message : ''}
                wrapperClassName='mt-6'
                name='email'
              ></Input>

              <Input
                type='password'
                placeholder='Password'
                register={register}
                errorMessage={errors?.password ? errors?.password.message : ''}
                wrapperClassName='mt-2'
                name='password'
              ></Input>
              <Input
                type='password'
                placeholder='Confirm Password'
                register={register}
                errorMessage={errors?.confirm_password ? errors?.confirm_password.message : ''}
                wrapperClassName='mt-2'
                name='confirm_password'
              ></Input>

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
