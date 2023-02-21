import AsideFilter from './components/asideFilter'
import { useQuery } from '@tanstack/react-query'
import { productApi } from 'src/apis/product.api'
import Pagination from 'src/components/pagination'
import { ProductConfig } from 'src/types/product.type'
import { categoryApi } from 'src/apis/category.api'
import SortProductList from './components/sortProductList'
import ProductItem from './components/productItem'
import useQueryConfig from 'src/hooks/useQueryConfig'

const ProductList = () => {
  const { queryConfig, queryParam } = useQueryConfig()
  const { data } = useQuery({
    queryKey: ['products', queryParam],
    queryFn: () => {
      return productApi.getproducts(queryConfig as ProductConfig)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  // console.log(data)

  // console.log(categoryData)
  // const [page, setPage] = useState(2)

  return (
    <div className='bg-gray-grayF5'>
      <div className='container py-4 '>
        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-2'>
            {categoryData && <AsideFilter queryConfig={queryConfig} categories={categoryData?.data.data}></AsideFilter>}
          </div>
          <div className='col-span-10'>
            {data && (
              <SortProductList
                queryConfig={queryConfig}
                pageSize={data?.data.data.pagination.page_size}
              ></SortProductList>
            )}

            <div className='grid grid-cols-2 gap-2 p-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {data &&
                data.data.data.products.map((product) => (
                  <ProductItem key={product._id} product={product}></ProductItem>
                ))}
            </div>

            {data && data?.data.data.products.length > 0 ? (
              <Pagination queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size}></Pagination>
            ) : (
              <span>Không có sản phẩm nào</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
