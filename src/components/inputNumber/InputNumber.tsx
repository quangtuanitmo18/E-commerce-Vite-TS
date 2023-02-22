import { forwardRef, InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string
  errorMessage?: string
  name?: string
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(function inputNumberInner(
  props: InputNumberProps,
  ref
) {
  const { type, wrapperClassName, className, placeholder, errorMessage, onChange, ...rest } = props
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if ((/^\d+$/.test(value) || value === '') && onChange) {
      onChange(e)
    }
  }
  return (
    <div className={`inline-flex ${wrapperClassName}`}>
      <input
        className={`w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow ${className}`}
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
