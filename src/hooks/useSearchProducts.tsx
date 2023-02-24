import { createSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchHeaderSchema, searchHeaderSchema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'
import omit from 'lodash/omit'
import path from 'src/constants/path'

type FormData = SearchHeaderSchema

const useSearchProducts = () => {
  const navigate = useNavigate()
  const { queryConfig } = useQueryConfig()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(searchHeaderSchema),
    defaultValues: {
      name: ''
    }
  })
  const onSubmitSearch = handleSubmit((data) => {
    // console.log(data)
    // khi search thì bỏ order và sortby
    //  ỏw đây làm đơn giản là lỗi thì ko submit được
    if (isValid) {
      const config = queryConfig.order
        ? omit({ ...queryConfig, name: data.name }, ['sort_by', 'order'])
        : { ...queryConfig, name: data.name }
      navigate({
        pathname: path.home,
        search: createSearchParams(config).toString()
      })
    }
  })
  return { onSubmitSearch, register }
}

export default useSearchProducts
