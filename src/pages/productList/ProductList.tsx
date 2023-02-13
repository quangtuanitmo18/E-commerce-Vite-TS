import useQueryParam from 'src/hooks/useQueryParam'
import AsideFilter from './asideFilter'
import ProductItem from './productItem'
import SortProductList from './sortProductList'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import Pagination from 'src/components/pagination'
import { useState } from 'react'
import { ProductConfig } from 'src/types/product.type'
import { isUndefined, omitBy } from 'lodash'

export type QueryConfig = {
  [key in keyof ProductConfig]: string
}

const ProductList = () => {
  const queryParam: QueryConfig = useQueryParam()
  // console.log(queryParam)
  // console.log('dasdas(d')
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit,
      sort_by: queryParam.sort_by,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['products', queryParam],
    queryFn: () => {
      return productApi.getproducts(queryConfig as ProductConfig)
    },
    keepPreviousData: true
  })
  // console.log(data)
  // const [page, setPage] = useState(2)

  return (
    <div className='bg-gray-grayF5'>
      <div className='container py-4 '>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-3'>
            <AsideFilter></AsideFilter>
          </div>
          <div className='col-span-9'>
            <SortProductList></SortProductList>
            <div className='grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <ProductItem key={product._id} product={product}></ProductItem>
                ))}
            </div>
            {data && (
              <Pagination queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size}></Pagination>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
