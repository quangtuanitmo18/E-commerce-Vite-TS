import classNames from 'classnames'
import React from 'react'

interface Props {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}
const RANGE = 2
const Pagination = (props: Props) => {
  const { page, setPage, pageSize } = props

  const renderpagination = () => {
    let dotAfter = false
    let dotBefore = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button key={index} className='cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button key={index} className='cursor-pointer rounded bg-white px-3 py-2 shadow-sm'>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE - 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            onClick={() => setPage(index + 1)}
            key={index}
            className={classNames('cursor-pointer rounded border bg-white px-3 py-2 shadow-sm', {
              'border-cyan-600': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
          >
            {pageNumber}
          </button>
        )
      })
  }

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'> Prev</button>
      {renderpagination()}
      <button className='mx-2 cursor-pointer rounded bg-white px-3 py-2 shadow-sm'> Next</button>
    </div>
  )
}

export default Pagination
