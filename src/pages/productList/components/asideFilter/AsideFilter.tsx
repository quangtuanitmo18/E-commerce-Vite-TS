import { yupResolver } from '@hookform/resolvers/yup'
import classNames from 'classnames'
import { omit } from 'lodash'
import { useForm, Controller } from 'react-hook-form'

import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import Button from 'src/components/button'
import InputNumber from 'src/components/inputNumber'
import path from 'src/constants/path'
import { category } from 'src/types/category.type'
import { NotUndefinedFiled } from 'src/types/utils.type'
import { PriceSchema, priceSchema } from 'src/utils/rules'
import RatingStar from '../productRating'
import { QueryConfig } from 'src/hooks/useQueryConfig'
import InputV2 from 'src/components/inputV2'

interface Props {
  queryConfig: QueryConfig
  categories: category[]
}
type formData = NotUndefinedFiled<PriceSchema>
//  de loai bo cai undefind nay thi can

const AsideFilter = ({ queryConfig, categories }: Props) => {
  // console.log(categories)
  const { category } = queryConfig
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid }
  } = useForm<formData>({
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    resolver: yupResolver(priceSchema)
  })
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    if (isValid) {
      navigate({
        pathname: path.home,
        search: createSearchParams({
          ...queryConfig,
          price_min: data.price_min,
          price_max: data.price_max
        }).toString()
      })
      // console.log(data)
    }
  })
  const handleDeleteFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['price_min', 'price_max', 'rating_filter', 'category']
        )
      ).toString()
    })
  }
  return (
    <div className='py-4'>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams(
            omit(
              {
                ...queryConfig
              },
              ['category']
            )
          ).toString()
        }}
        className='flex items-center gap-2 border-b border-solid border-gray-300 pb-5'
      >
        <svg viewBox='0 0 12 10' className={classNames('h-4 w-4', { 'fill-primary': category === undefined })}>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <p className={classNames('', { 'text-primary': category === undefined })}>Tất cả danh mục</p>
      </Link>
      <ul className='flex flex-col gap-3 py-5 px-2'>
        {categories &&
          categories.map((categoryItem) => (
            <li
              className={classNames(' ', {
                'text-primary': category === categoryItem._id
              })}
              key={categoryItem._id}
            >
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className='flex gap-2'
              >
                <svg
                  viewBox='0 0 4 7'
                  className={classNames('h-3 w-3', {
                    'fill-primary': category === categoryItem._id
                  })}
                >
                  <polygon points='4 3.5 0 0 0 7' />
                </svg>
                {categoryItem.name}
              </Link>
            </li>
          ))}
      </ul>
      <div className='py-5 '>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='shopee-svg-icon h-4 w-4 fill-black'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
        {/* price filter */}
        <div className='px-2'>
          <div className='border-b border-solid border-gray-300 py-5 '>
            <p> Khoảng giá</p>
            <form action='' onSubmit={onSubmit}>
              <div className='mt-3 flex h-auto items-center gap-2'>
                {/*  test thử usecontroller với cách khai báo để gợi ý name hơi phức tạo */}
                <InputV2
                  control={control}
                  type='number'
                  name='price_min'
                  placeholder='Từ'
                  onChange={() => {
                    trigger('price_max')
                  }}
                ></InputV2>
                {/* <Controller
                  name='price_min'
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputNumber
                        type='text'
                        name='price_min'
                        placeholder='Từ'
                        className='p-1 outline-none'
                        onChange={(e) => {
                          field.onChange(e)
                          trigger('price_max')
                        }}
                        value={field.value}
                        ref={field.ref}
                      />
                    )
                  }}
                /> */}
                <div className='mx-2 shrink-0'>-</div>
                <Controller
                  name='price_max'
                  control={control}
                  render={({ field }) => {
                    return (
                      <InputNumber
                        type='text'
                        name='price_max'
                        placeholder='Đến'
                        className='p-1 outline-none'
                        onChange={(e) => {
                          field.onChange(e)
                          trigger('price_min')
                        }}
                        value={field.value}
                        ref={field.ref}
                      />
                    )
                  }}
                />
              </div>
              <span className='inline-block  text-sm text-primary'>{errors.price_min?.message}</span>
              <Button className=' mt-2 h-auto rounded-none px-4 py-2 text-sm'>Áp dụng</Button>
            </form>
          </div>
          <div className='border-b border-solid border-gray-300 py-5'>
            <p>Đánh Giá</p>
            <RatingStar queryConfig={queryConfig}></RatingStar>
          </div>
        </div>
        <Button onClick={handleDeleteFilter} className='h-auto rounded-none px-4 py-2 text-sm'>
          Xóa Tất Cả
        </Button>
      </div>
    </div>
  )
}

export default AsideFilter
