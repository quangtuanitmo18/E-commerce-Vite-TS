import React from 'react'
import { Link } from 'react-router-dom'
import { Product as productType } from 'src/types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from 'src/utils/utils'

interface Props {
  product: productType
}

const ProductItem = ({ product }: Props) => {
  return (
    <Link to='/'>
      <div className='rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt='' className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
      </div>
      <div className='overflow-hidden p-2'>
        <p className='truncate text-sm'>{product.name}</p>
        <div className='mt-3 text-primary'>
          <span className='mr-2 text-gray-400 line-through'>{formatCurrency(product.price_before_discount)}</span>
          {formatCurrency(product.price)}
        </div>
        <div className='mb-3 flex items-center gap-2 text-sm'>
          <div className='relative'>
            <div className='z-1 absolute top-0 left-0 h-full w-[50%] overflow-hidden'>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                className='relative h-3 w-3 fill-yellow-400'
              >
                <polygon
                  points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeMiterlimit={10}
                />
              </svg>
            </div>
            <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='h-3 w-3 fill-gray-400'>
              <polygon
                points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </svg>
          </div>
          <span className=''>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
        </div>
        <div className='text-sm text-gray-400'>Hà Nội</div>
      </div>
    </Link>
  )
}

export default ProductItem
