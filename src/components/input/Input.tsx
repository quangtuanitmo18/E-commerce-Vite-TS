import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  register: UseFormRegister<any>
  wrapperClassName?: string
  clasName?: string
  placeholder: string
  errorMessage?: string
  rules?: RegisterOptions
}

const Input = ({ type, register, wrapperClassName, clasName, placeholder, errorMessage, rules, ...rest }: Props) => {
  return (
    <div className={`${wrapperClassName}`}>
      <input
        className={`w-full rounded border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow ${clasName}`}
        type={type}
        placeholder={placeholder}
        {...register('email', rules)}
      />
      <div className='h-4 text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
}

export default Input
