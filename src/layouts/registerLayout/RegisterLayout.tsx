import React from 'react'
import Footer from 'src/components/footer'
import HeaderRegister from 'src/components/headerRegister'

interface Props {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <HeaderRegister></HeaderRegister>
      <main className='flex-1'>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default RegisterLayout
