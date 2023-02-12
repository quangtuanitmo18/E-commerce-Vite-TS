import useQueryParam from 'src/hooks/useQueryParam'
import AsideFilter from './asideFilter'
import ProductItem from './productItem'
import SortProductList from './sortProductList'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'

const ProductList = () => {
  const queryParam = useQueryParam()
  // console.log(queryParam)
  // console.log('dasdas(d')
  const { data } = useQuery({
    queryKey: ['products', queryParam],
    queryFn: () => {
      return productApi.getproducts(queryParam)
    }
  })
  console.log(data)

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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
