import React from 'react'
import Footer from 'src/components/footer'
import HeaderCart from 'src/components/headerCart'

interface Props {
  children?: React.ReactNode
}
const CartLayout = ({ children }: Props) => {
  return (
    <>
      {/* <HeaderRegister></HeaderRegister> */}
      <HeaderCart></HeaderCart>
      {children}
      <Footer></Footer>
    </>
  )
}

export default CartLayout
