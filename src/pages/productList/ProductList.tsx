import AsideFilter from './asideFilter'
import ProductItem from './productItem'
import SortProductList from './sortProductList'

const ProductList = () => {
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
              {Array(20)
                .fill(0)
                .map((item, index) => (
                  <ProductItem key={index}></ProductItem>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
