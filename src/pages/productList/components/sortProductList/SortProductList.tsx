import classNames from 'classnames'
import { omit } from 'lodash'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { product } from 'src/constants/product'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import { ProductConfig } from 'src/types/product.type'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const SortProductList = ({ queryConfig, pageSize }: Props) => {
  const { sort_by = product.sort_by.createdAt } = queryConfig
  const currentPage = Number(queryConfig.page)
  const navigate = useNavigate()
  const isActiveSortBy = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    return sort_by === sortByValue
  }

  const handleSort = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handlePriceOrder = (sortByValue: Exclude<ProductConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: product.sort_by.price,
        order: sortByValue
      }).toString()
    })
  }

  return (
    <div className='flex items-center  justify-between bg-gray-200 p-3'>
      <div className='flex items-center gap-4 '>
        <span>Sắp xếp theo</span>
        <div className='mt-2 flex gap-2'>
          <button
            onClick={() => handleSort(product.sort_by.view)}
            className={classNames('px-3 py-2 text-sm ', {
              'bg-primary text-white': isActiveSortBy(product.sort_by.view),
              'bg-white text-black': !isActiveSortBy(product.sort_by.view)
            })}
          >
            Phổ Biến
          </button>
          <button
            onClick={() => handleSort(product.sort_by.createdAt)}
            className={classNames('px-3 py-2 text-sm ', {
              'bg-primary text-white': isActiveSortBy(product.sort_by.createdAt),
              'bg-white text-black': !isActiveSortBy(product.sort_by.createdAt)
            })}
          >
            Mới Nhất
          </button>
          <button
            onClick={() => handleSort(product.sort_by.sold)}
            className={classNames('px-3 py-2 text-sm ', {
              'bg-primary text-white': isActiveSortBy(product.sort_by.sold),
              'bg-white text-black': !isActiveSortBy(product.sort_by.sold)
            })}
          >
            Bán Chạy
          </button>
          <select
            name=''
            id=''
            className={classNames('outline-none', {
              'bg-primary text-white': isActiveSortBy(product.sort_by.price),
              'bg-white text-black': !isActiveSortBy(product.sort_by.price)
            })}
            onChange={(e) => handlePriceOrder(e.target.value as Exclude<ProductConfig['sort_by'], undefined>)}
          >
            <option className='bg-white text-black' value=''>
              Giá
            </option>
            <option className='bg-white text-black' value={product.order.asc}>
              Từ thấp đến cao
            </option>
            <option className='bg-white text-black' value={product.order.desc}>
              Từ cao xuống thâp
            </option>
          </select>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <div>
          <span className='text-primary'>{currentPage}/</span>
          <span>{pageSize}</span>
        </div>
        <div className='flex'>
          {currentPage === 1 ? (
            <span className='cursor-not-allowed border border-solid border-gray-100 bg-gray-200  p-2'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (currentPage - 1).toString()
                }).toString()
              }}
              className='cursor-pointer border border-solid border-gray-100 bg-white p-2'
            >
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
            </Link>
          )}

          {currentPage === pageSize ? (
            <span className='cursor-not-allowed border border-solid border-gray-100 bg-gray-200  p-2'>
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
            </span>
          ) : (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (currentPage + 1).toString()
                }).toString()
              }}
              className='cursor-pointer border border-solid border-gray-100 bg-white p-2'
            >
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
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default SortProductList
