import React from 'react'
import Footer from 'src/components/footer'
import HeaderCart from 'src/components/headerCart'

interface Props {
  children?: React.ReactNode
}
const CartLayout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* <HeaderRegister></HeaderRegister> */}
      <HeaderCart></HeaderCart>
      <main className='flex-1'>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default CartLayout
