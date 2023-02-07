import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
import * as yup from 'yup'

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
  confirm_password: yup
    .string()
    .required('Password là bắt buộc')
    .min(8, 'Độ dài kí tự từ 8-160')
    .max(160, 'Độ dài kí tự từ 5-160')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Mật khẩu không đúng định dạng')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export type RegisterSchema = yup.InferType<typeof schema>
export const loginSchema = schema.omit(['confirm_password'])
export type LoginSchema = yup.InferType<typeof loginSchema>
