import React, { memo } from 'react'
import Footer from 'src/components/footer'
import Header from 'src/components/header'

interface Props {
  children?: React.ReactNode
}

const MainLayoutComponent = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header></Header>
      <main className='flex-1'>{children}</main>
      <Footer></Footer>
    </div>
  )
}

const MainLayout = memo(MainLayoutComponent)

export default MainLayout
