import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSideNav from '../components/userSidenav'

const UserLayout = () => {
  return (
    <div>
      <UserSideNav></UserSideNav>
      <Outlet></Outlet>
    </div>
  )
}

export default UserLayout
