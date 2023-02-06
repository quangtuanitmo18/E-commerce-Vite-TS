import { useForm } from 'react-hook-form'
import Input from 'src/components/input'
import { LoginSchema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'

// interface FormData {
//   email: string
//   password: string
// }
type FormData = LoginSchema

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  return (
    <div className='h-full bg-primary'>
      <div className='container py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='rounded bg-white p-5 lg:col-span-2 lg:col-start-4'>
            <p className=' text-xl text-black lg:text-2xl'>Đăng Nhập</p>
            <form action=''>
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

              <button className='w-full rounded bg-primary p-4 text-white'>Đăng Nhập</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
