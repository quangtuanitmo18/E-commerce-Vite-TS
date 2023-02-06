import React from 'react'

interface Props {
  children?: React.ReactNode
}

const RegisterLyaout = ({ children }: Props) => {
  return (
    <div>
      RegisterLayout
      {children}
    </div>
  )
}

export default RegisterLyaout
