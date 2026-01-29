import Input from 'src/components/input'
import { useForm, Controller } from 'react-hook-form'
import { userSchema, UserSchema } from 'src/utils/rules'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from 'src/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'

import InputNumber from 'src/components/inputNumber'
import { useEffect, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { setProfileToLS } from 'src/utils/app'
import { useApp } from 'src/contexts/app.context'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import InputFile from 'src/components/inputFile'
import Button from 'src/components/button'
import { Helmet } from 'react-helmet-async'
import { LoadingSpin } from 'src/components/loading'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function Profile() {
  const queryClient = useQueryClient()
  const profileQueryKey = ['profile'] as const
  const { data: profileData, isLoading } = useQuery({
    queryKey: profileQueryKey,
    queryFn: userApi.getProfile,
    staleTime: 3 * 60 * 1000
  })
  const [file, setFile] = useState<File>()
  const [previewImage, setPreviewImage] = useState('')
  useEffect(() => {
    if (!file) {
      setPreviewImage('')
      return
    }
    const url = URL.createObjectURL(file)
    setPreviewImage(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  const { setProfile } = useApp()
  const updateProfileMutation = useMutation(userApi.updateProfile)
  const uploadAvatarMutaion = useMutation(userApi.uploadAvatar)

  const {
    control,
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isValid }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  const avatar = watch('avatar')

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfileToLS(res.data.data)
      setProfile(res.data.data)
      queryClient.invalidateQueries({ queryKey: profileQueryKey })
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponseApi<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleFileChange = (file?: File) => {
    setFile(file)
  }

  const profile = profileData?.data.data
  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue('avatar', profile.avatar)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1))
    }
  }, [profile, setValue])

  if (isLoading) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <LoadingSpin className='fill-primary' />
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <Helmet>
        <title>Profile | Shopee Clone</title>
        <meta name='description' content='Update your profile on Shopee Clone' />
      </Helmet>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>My Profile</h1>
        <div className='mt-1 text-sm text-gray-700'>Manage and protect your account information</div>
      </div>
      <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
        <form className='mt-6 w-full flex-col md:mt-0 md:pr-12' onSubmit={onSubmit}>
          <div className='flex w-full justify-between'>
            <div className='w-[70%]'>
              <div className='flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <div className='pt-3 text-gray-700'>{profile.email}</div>
                </div>
              </div>
              <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Name</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input name='name' register={register} placeholder='Name' errorMessage={errors.name?.message} />
                </div>
              </div>
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Phone Number</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field }) => (
                      <InputNumber
                        wrapperClassName='w-full'
                        placeholder='Phone Number'
                        errorMessage={errors.phone?.message}
                        {...field}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Address</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input
                    name='address'
                    register={register}
                    placeholder='Address'
                    errorMessage={errors.address?.message}
                  />
                </div>
              </div>
              <Controller
                control={control}
                name='date_of_birth'
                render={({ field }) => (
                  <DateSelect
                    errorMessage={errors.date_of_birth?.message}
                    value={field.value}
                    onChange={field.onChange}
                  ></DateSelect>
                )}
              />
            </div>
            <div className='flex w-[30%] justify-center md:w-72 md:border-l md:border-l-gray-200  '>
              <div className='flex flex-col items-center'>
                <div className='my-5 h-24 w-24'>
                  <img
                    src={previewImage || getAvatarUrl(avatar)}
                    alt='avatar'
                    loading='lazy'
                    className='w-full rounded-full object-cover'
                  />
                </div>
                <InputFile onChange={handleFileChange}></InputFile>
                <div className='mt-3 text-gray-400'>
                  <div>Maximum file size: 1 MB</div>
                  <div>Formats: .JPEG, .PNG</div>
                </div>
                <div>{errors.avatar?.message}</div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <Button className='w-[400px]'>Update</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
