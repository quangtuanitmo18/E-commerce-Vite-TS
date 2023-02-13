import { forwardRef, InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
  clasName?: string
  errorMessage?: string
  name: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function inputNumberInner(props: Props, ref) {
  const { type, wrapperClassName, clasName, placeholder, errorMessage, onChange, ...rest } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={`${wrapperClassName}`}>
      <input
        className={`w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow ${clasName}`}
        type={type}
        placeholder={placeholder}
        {...rest}
        ref={ref}
        onChange={handleChange}
      />
      <div className='h-4 text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
