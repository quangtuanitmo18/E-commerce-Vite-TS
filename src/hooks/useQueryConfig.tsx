import { isUndefined, omitBy } from 'lodash'
import React from 'react'
import { ProductConfig } from 'src/types/product.type'
import useQueryParam from './useQueryParam'
export type QueryConfig = {
  [key in keyof ProductConfig]: string
}

const useQueryConfig = () => {
  const queryParam: QueryConfig = useQueryParam()
  // console.log(queryParam)
  // console.log('dasdas(d')
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParam.page || '1',
      limit: queryParam.limit || '20',
      sort_by: queryParam.sort_by,
      exclude: queryParam.exclude,
      name: queryParam.name,
      order: queryParam.order,
      price_max: queryParam.price_max,
      price_min: queryParam.price_min,
      rating_filter: queryParam.rating_filter,
      category: queryParam.category
    },
    isUndefined
  )
  return { queryConfig, queryParam }
}

export default useQueryConfig
