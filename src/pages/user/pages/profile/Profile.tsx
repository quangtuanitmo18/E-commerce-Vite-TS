import Input from 'src/components/input'
import { useForm, Controller } from 'react-hook-form'
import { userSchema, UserSchema } from 'src/utils/rules'
import { useQuery, useMutation } from '@tanstack/react-query'
import { userApi } from 'src/apis/user.api'
import { yupResolver } from '@hookform/resolvers/yup'

import InputNumber from 'src/components/inputNumber'
import { useEffect, useMemo, useRef, useState } from 'react'
import DateSelect from '../../components/DateSelect'
import { toast } from 'react-toastify'
import { setProfileToLS } from 'src/utils/app'
import { useApp } from 'src/contexts/app.context'
import userImgDefault from 'src/assets/images/user-default.png'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponseApi } from 'src/types/utils.type'
import config from 'src/constants/config'
import InputFile from 'src/components/inputFile'
import Button from 'src/components/button'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}

export default function Profile() {
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  // console.log(profileData)
  // hiêtn thị file
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
  // console.log(previewImage)

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
  // console.log(avatar)

  const onSubmit = handleSubmit(async (data) => {
    // console.log(data)
    try {
      let avatarName = avatar
      if (file) {
        const form = new FormData()
        form.append('image', file)
        const uploadRes = await uploadAvatarMutaion.mutateAsync(form)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
        // console.log(avatar)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfileToLS(res.data.data)
      setProfile(res.data.data)
      refetch()
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
          // console.log(formError)
        }
      }
    }
    // const res = await updateProfileMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
  })

  // const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const fileFromLocal = e.target.files?.[0]
  //   // console.log(fileFromLocal)
  //   if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
  //     toast.error('Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG')
  //   } else {
  //     setFile(fileFromLocal)
  //   }
  // }
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

  if (!profile) return null

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
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
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input name='name' register={register} placeholder='Tên' errorMessage={errors.name?.message} />
                </div>
              </div>
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Controller
                    control={control}
                    name='phone'
                    render={({ field }) => (
                      <InputNumber
                        wrapperClassName='w-full'
                        placeholder='Số điện thoại'
                        errorMessage={errors.phone?.message}
                        {...field}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              </div>
              <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
                <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
                <div className='sm:w-[80%] sm:pl-5'>
                  <Input
                    name='address'
                    register={register}
                    placeholder='Địa chỉ'
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
                    className='w-full w-full rounded-full object-cover'
                  />
                </div>
                <InputFile onChange={handleFileChange}></InputFile>
                <div className='mt-3 text-gray-400'>
                  <div>Dụng lượng file tối đa 1 MB</div>
                  <div>Định dạng:.JPEG, .PNG</div>
                </div>
                <div>{errors.avatar?.message}</div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'></div>
            <Button className='w-[400px]'>Cập nhật</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
