import React from 'react'
import { Link } from 'react-router-dom'
import ProductRating from 'src/components/productRatting'
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
          <ProductRating rating={product.rating}></ProductRating>
          <span className=''>Đã bán {formatNumberToSocialStyle(product.sold)}</span>
        </div>
        <div className='text-sm text-gray-400'>Hà Nội</div>
      </div>
    </Link>
  )
}

export default ProductItem
