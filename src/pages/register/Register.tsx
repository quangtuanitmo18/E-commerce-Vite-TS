/* eslint-disable import/no-unresolved */
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/input'
import { RegisterSchema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi, SuccessResponseApi } from 'src/types/utils.type'
import { useApp } from 'src/contexts/app.context'
import Button from 'src/components/button'
import path from 'src/constants/path'
import { setProfileToLS } from 'src/utils/app'
import { authApi } from 'src/apis/auth.api'
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
    setError,
    formState: { errors, isValid }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const { isAuthenticated, setIsAuthenticated } = useApp()
  const navigate = useNavigate()
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const handleRegister: SubmitHandler<FormData> = (data: FormData) => {
    if (isValid) {
      // console.log(data)
      const body = omit(data, ['confirm_password'])
      registerAccountMutation.mutate(body, {
        onSuccess(data, variables, context) {
          setIsAuthenticated(true)
          setProfileToLS(data.data.data.user)
          navigate('/')
        },
        onError: (error) => {
          if (isAxiosUnprocessableEntityError<ErrorResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
            const formError = error.response?.data.data
            // console.log(Object.keys(formError))
            if (formError) {
              for (const key in formError) {
                setError(key as keyof Omit<FormData, 'confirm_password'>, {
                  message: formError[key as keyof Omit<FormData, 'confirm_password'>],
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

              <Button
                type='submit'
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                Đăng Ký
              </Button>
              <div className='mt-4 text-center text-sm text-gray-500'>
                Bạn đã có tài khoản?{' '}
                <Link className='text-primary' to={path.login}>
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
