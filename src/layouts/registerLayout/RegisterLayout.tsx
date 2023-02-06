import React from 'react'
import Footer from 'src/components/footer'
import HeaderRegister from 'src/components/headerRegister'

interface Props {
  children?: React.ReactNode
}

const RegisterLayout = ({ children }: Props) => {
  return (
    <>
      <HeaderRegister></HeaderRegister>
      {children}
      <Footer></Footer>
    </>
  )
}

export default RegisterLayout
