import { FloatingPortal } from '@floating-ui/react'
import { arrow, offset, shift, useFloating } from '@floating-ui/react-dom'
import { useRef, useState } from 'react'
import { Logo, Search, Cart } from '../icon'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, reference, floating, middlewareData } = useFloating({
    middleware: [offset(10), shift(), arrow({ element: arrowRef })]
  })
  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }

  return (
    <header className='bg-primary'>
      <div className='container flex justify-end gap-4  p-5 text-white'>
        <div
          className='ml-auto flex cursor-pointer flex-row items-center gap-2'
          ref={reference}
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
        >
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
          <span>Tiếng Việt</span>
          <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='currentColor'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
              fill='currentColor'
            />
          </svg>
          {/* Popover */}
          <FloatingPortal id='custom-root-id'>
            {isOpen && (
              <motion.div
                ref={floating}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.5 }}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
              >
                <span
                  ref={arrowRef}
                  className="  absolute z-10  translate-y-[-99%] after:inline-block after:h-[20px]  after:w-28 after:translate-x-[-50%] after:bg-transparent after:content-['']"
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y,
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderBottom: '10px solid white'
                  }}
                />

                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                  <div className='flex flex-col gap-2 px-3 py-2'>
                    <button className='py-2 px-3 hover:text-primary'>Tiếng Việt</button>
                    <button className='py-2 px-3 hover:text-primary'>English</button>
                  </div>
                </div>
              </motion.div>
            )}
          </FloatingPortal>
        </div>
        <div className='flex cursor-pointer items-center gap-2'>
          <img src='https://source.unsplash.com/random' className='h-5 w-5 rounded-full object-cover' alt='' />
          <span>NguyenTuan</span>
        </div>
      </div>
      <div className='container grid grid-cols-12 gap-4 bg-primary p-5'>
        <div className='col-span-2'>
          <Logo className='fill-white'></Logo>
        </div>
        <div className='col-span-9 flex rounded-sm bg-white p-1'>
          <input className='flex-1 outline-none' type='text' placeholder='Tìm kiếm sản phẩm' />
          <button className='flex flex-shrink-0 items-center justify-center rounded-sm  bg-primary py-2 px-6'>
            <Search className='text-white'></Search>
          </button>
        </div>
        <div className='col-span-1 flex cursor-pointer items-center justify-center'>
          <Cart className='text-white '></Cart>
        </div>
      </div>
    </header>
  )
}

export default Header
