import { useForm } from 'react-hook-form'
import Input from 'src/components/input'
import { loginSchema, LoginSchema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import { useApp } from 'src/contexts/app.context'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/button'

// interface FormData {
//   email: string
//   password: string
// }
type FormData = LoginSchema

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    // getValues,
    // watch,
    formState: { errors, isValid }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })

  const { isAuthenticated, setIsAuthenticated } = useApp()
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })
  const handleLogin = (data: FormData) => {
    // console.log(data)
    if (isValid) {
      loginMutation.mutate(data, {
        onSuccess(data, variables, context) {
          // console.log(data)
          setIsAuthenticated(true)
          navigate('/')
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormData>>(error)) {
            const formError = error.response?.data.data
            // console.log(Object.keys(formError))
            if (formError) {
              for (const key in formError) {
                setError(key as keyof FormData, {
                  message: formError[key as keyof FormData],
                  type: 'Server'
                })
              }
            }
          }
        }
      })
      // console.log(body)
    }
  }

  return (
    <div className='h-full bg-primary'>
      <div className='container py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-5'>
          <div className='rounded bg-white p-5 lg:col-span-2 lg:col-start-4'>
            <p className=' text-xl text-black lg:text-2xl'>Đăng Nhập</p>
            <form action='' onSubmit={handleSubmit(handleLogin)}>
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

              <Button type='submit' isLoading={loginMutation.isLoading} disabled={loginMutation.isLoading}>
                Đăng Nhập
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
