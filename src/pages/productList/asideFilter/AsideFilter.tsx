import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/components/button'
import path from 'src/constants/path'

const AsideFilter = () => {
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex gap-2  border-b border-solid border-gray-300 pb-5'>
        <svg viewBox='0 0 12 10' className='shopee-svg-icon shopee-category-list__header-icon icon-all-cate h-4 w-4'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <ul className='py-5'>
        <li className=' text-primary'>
          <Link to={path.home} className='flex gap-2'>
            <svg viewBox='0 0 4 7' className='h-3 w-3 fill-primary'>
              <polygon points='4 3.5 0 0 0 7' />
            </svg>
            Thời Trang Nam
          </Link>
        </li>
      </ul>
      <div className='py-5 '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='shopee-svg-icon h-4 w-4 fill-black'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
        {/* price filter */}
        <div className='border-b border-solid border-gray-300 py-5'>
          <p>Đánh Giá</p>
          <ul className='p-3'>
            <li className='flex gap-1'>
              {Array(5)
                .fill(0)
                .map((item, index) => (
                  <svg viewBox='0 0 9.5 8' className='h-4 w-4' key={index}>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              trở lên
            </li>
          </ul>
        </div>
        <Button className='h-auto rounded-none px-4 py-2 text-sm'>Xóa Tất Cả</Button>
      </div>
    </div>
  )
}

export default AsideFilter
