import React, { memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { useApp } from 'src/contexts/app.context'
import Popover from '../popover'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from 'src/apis/auth.api'
import { purchaseStatus } from 'src/constants/purchase'
import { useTranslation } from 'react-i18next'
import { locales } from 'src/i18n/i18n'

const NavHeaderComponent = () => {
  // test error boundary
  // throw new Error('something went wrong!')
  const { i18n } = useTranslation()
  const currentLanguage = locales[i18n.language as keyof typeof locales]

  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useApp()
  // console.log(currentLanguage)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const LogoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
    }
  })
  const changeLanguages = (lng: 'en' | 'vi') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='container flex justify-end gap-4  p-5 text-white'>
      {/* <Popover
        renderPopover={
          <>
            <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path d='M1.33398 8H14.6673' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
            <span>{currentLanguage}</span>
            <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='currentColor'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                fill='currentColor'
              />
            </svg>
          </>
        }
      >
        <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
          <div className='flex flex-col gap-2 px-3 py-2'>
            <button className='py-2 px-3 hover:text-primary' onClick={() => changeLanguages('vi')}>
              Vietnamese
            </button>
            <button className='py-2 px-3 hover:text-primary' onClick={() => changeLanguages('en')}>
              English
            </button>
          </div>
        </div>
      </Popover> */}
      {isAuthenticated ? (
        <Popover
          renderPopover={
            <div className='flex cursor-pointer items-center gap-2'>
              <img src='https://source.unsplash.com/random' className='h-5 w-5 rounded-full object-cover' alt='' />
              <span>{profile?.email}</span>
            </div>
          }
        >
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col gap-2 px-3 py-2'>
              <button className='py-2 px-3 hover:text-primary' onClick={() => navigate(path.profile)}>
                Profile
              </button>
              <button className='py-2 px-3 hover:text-primary' onClick={() => LogoutMutation.mutate()}>
                Logout
              </button>
            </div>
          </div>
        </Popover>
      ) : (
        <>
          <Link to={path.login}>Login </Link> | <Link to={path.register}>Register</Link>
        </>
      )}
    </div>
  )
}

const NavHeader = memo(NavHeaderComponent)

export default NavHeader
