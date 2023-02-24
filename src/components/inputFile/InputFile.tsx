import React, { useRef } from 'react'
import { toast } from 'react-toastify'
import config from 'src/constants/config'

interface Props {
  onChange?: (file?: File) => void
}

const InputFile = ({ onChange }: Props) => {
  const refInputFile = useRef<HTMLInputElement>(null)
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = e.target.files?.[0]
    // console.log(fileFromLocal)
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error('Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG')
    } else {
      onChange && onChange(fileFromLocal)
    }
  }
  const handleUploadImg = () => {
    refInputFile.current?.click()
  }
  return (
    <>
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        // {...register('avatar')}
        ref={refInputFile}
        onChange={onFileChange}
        onClick={(e) => {
          ;(e.target as any).value = null
        }}
      />
      <button
        type='button'
        className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'
        onClick={handleUploadImg}
      >
        Chọn ảnh
      </button>
    </>
  )
}

export default InputFile
