import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'
import { AnyObject } from 'yup/lib/types'

type Rules = {
  [key in 'email' | 'password' | 'confirm_passoword']?: RegisterOptions
}

// export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
//   email: {
//     required: 'Email là bắt buộc',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự từ 5-160'
//     },
//     minLength: {
//       value: 5,
//       message: 'Độ dài kí tự từ 5-160'
//     },
//     pattern: {
//       value:
//         /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
//       message: 'Email không đúng định dạng'
//     }
//   },
//   password: {
//     required: 'Mật khẩu là bắt buộc',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự từ 6-160'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài kí tự từ 6-160'
//     },
//     pattern: {
//       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       message: 'Mật khẩu không đúng định dạng' //Mật khẩu chứa tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
//     }
//   },
//   confirm_passoword: {
//     required: 'Mật khẩu là bắt buộc',
//     maxLength: {
//       value: 160,
//       message: 'Độ dài kí tự từ 6-160'
//     },
//     minLength: {
//       value: 6,
//       message: 'Độ dài kí tự từ 6-160'
//     },
//     pattern: {
//       value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       message: 'Mật khẩu không đúng định dạng'
//     },
//     validate:
//       typeof getValues === 'function' ? (value) => value === getValues('password') || 'Mật khẩu không khớp' : undefined
//   }
// })
const handleCheckConfirmPassword = (refString: string) => {
  return yup
    .string()
    .required('Password là bắt buộc')
    .min(8, 'Độ dài kí tự từ 8-160')
    .max(160, 'Độ dài kí tự từ 5-160')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu không đúng định dạng')
    .oneOf([yup.ref(refString)], 'Nhập lại mật khẩu không khớp')
}

function testPriceMinMax(this: yup.TestContext<AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .min(5, 'Độ dài kí tự từ 5-160')
    .max(160, 'Độ dài kí tự từ 5-160')
    .matches(
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      'Email không đúng định dạng'
    ),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(8, 'Độ dài kí tự từ 8-160')
    .max(160, 'Độ dài kí tự từ 5-160')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu không đúng định dạng'),
  confirm_password: handleCheckConfirmPassword('password'),

  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})
export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 ký tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 ký tự'),
  address: yup.string().max(160, 'Độ dài tối da là 160 ký tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 ký tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn 1 ngày trong quá khứ'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: handleCheckConfirmPassword('new_password')
})

export const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
export type RegisterSchema = yup.InferType<typeof registerSchema>
export const loginSchema = schema.pick(['email', 'password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
export const priceSchema = schema.pick(['price_min', 'price_max'])
export type PriceSchema = yup.InferType<typeof priceSchema>

export const searchHeaderSchema = schema.pick(['name'])
export type SearchHeaderSchema = yup.InferType<typeof searchHeaderSchema>

// userSchema
export type UserSchema = yup.InferType<typeof userSchema>
