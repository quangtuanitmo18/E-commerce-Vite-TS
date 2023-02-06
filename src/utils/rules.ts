import type { RegisterOptions } from 'react-hook-form'

type Rules = {
  [key in 'email' | 'password' | 'confirm_passoword']?: RegisterOptions
}

export const rules: Rules = {
  email: {
    required: 'Email là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Độ dài kí tự từ 5-160'
    },
    minLength: {
      value: 5,
      message: 'Độ dài kí tự từ 5-160'
    },
    pattern: {
      value:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: 'Email không đúng định dạng'
    }
  },
  password: {
    required: 'Mật khẩu là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Độ dài kí tự từ 6-160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài kí tự từ 6-160'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Mật khẩu không đúng định dạng' //Mật khẩu chứa tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt
    }
  },
  confirm_passoword: {
    required: 'Mật khẩu là bắt buộc',
    maxLength: {
      value: 160,
      message: 'Độ dài kí tự từ 6-160'
    },
    minLength: {
      value: 6,
      message: 'Độ dài kí tự từ 6-160'
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Mật khẩu không đúng định dạng'
    }
  }
}
