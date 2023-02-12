import Button from 'src/components/button'

const SortProductList = () => {
  return (
    <div className='flex items-center  justify-between bg-gray-200 p-3'>
      <div className='flex items-center gap-4 '>
        <span>Sắp xếp theo</span>
        <div className='mt-2 flex gap-2'>
          <button className='bg-primary px-3 py-2 text-sm text-white'> Phổ Biến</button>
          <button className='bg-primary px-3 py-2 text-sm text-white'> Mới Nhất</button>
          <button className='bg-primary px-3 py-2 text-sm text-white'> Bán Chạy</button>
          <select name='' id='' className='outline-none'>
            <option value=''>Giá</option>
            <option value=''>Từ thấp đến cao</option>
            <option value=''>Từ cao xuống thâp</option>
          </select>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div>
          <span className='text-primary'>1/</span>
          <span>9</span>
        </div>
        <div className='flex'>
          <div className='cursor-not-allowed border border-solid border-gray-100 bg-gray-100 p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
            </svg>
          </div>
          <div className='cursor-pointer border border-solid border-gray-100 bg-white p-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortProductList
