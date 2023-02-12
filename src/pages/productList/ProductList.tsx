import AsideFilter from './asideFilter'
import SortProductList from './sortProductList'

const ProductList = () => {
  return (
    <div className='bg-gray-grayF5'>
      <div className='container py-4 '>
        <div className='grid grid-cols-12'>
          <div className='col-span-3'>
            <AsideFilter></AsideFilter>
          </div>
          <div className='col-span-9'>
            <SortProductList></SortProductList>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
