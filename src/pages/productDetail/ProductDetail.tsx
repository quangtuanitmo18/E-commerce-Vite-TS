import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { productApi } from 'src/apis/product.api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ProductRating from 'src/components/productRatting'
import { formatCurrency, formatNumberToSocialStyle, getIdFromNameId, rateSale } from 'src/utils/utils'
import DOMPurify from 'dompurify'
import { Product, ProductConfig } from 'src/types/product.type'
import { v4 as uuidv4 } from 'uuid'
import ProductItem from '../productList/components/productItem'
import QuantityController from 'src/components/quantityController'
import { purchaseApi } from 'src/apis/purchase.api'
import { purchaseStatus } from 'src/constants/purchase'
import { toast } from 'react-toastify'
import path from 'src/constants/path'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'

const ProductDetail = () => {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const [buyCount, setBuyCount] = useState(1)
  // console.log(id)
  const navigate = useNavigate()
  const { t } = useTranslation(['product', 'home'])

  const queryClient = useQueryClient()

  const { data: productDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const product = productDetailData?.data.data
  const [activeImage, setActiveImage] = useState('')
  const currentImages = useMemo(
    () => (product ? product.images.slice(...currentIndexImage) : []),
    [product, currentIndexImage]
  )

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (product && product.images.length > 0) {
      setActiveImage(product.images[0])
    }
  }, [product, currentIndexImage])

  const handleBycount = (value: number) => {
    setBuyCount(value)
  }
  const next = () => {
    console.log(currentIndexImage[1], (product as Product).images.length)
    if (currentIndexImage[1] < (product as Product).images.length) {
      // console.log('dsadsa')

      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      // console.log('dsadsa')
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleZoom = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const image = imageRef.current as HTMLImageElement
    const { naturalHeight, naturalWidth } = image
    // Cách 1: Lấy offsetX, offsetY đơn giản khi chúng ta đã xử lý được bubble event
    // const { offsetX, offsetY } = event.nativeEvent

    // Cách 2: Lấy offsetX, offsetY khi chúng ta không xử lý được bubble event
    const offsetX = event.pageX - (rect.x + window.scrollX)
    const offsetY = event.pageY - (rect.y + window.scrollY)

    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalWidth / rect.width)
    image.style.width = naturalWidth + 'px'
    image.style.height = naturalHeight + 'px'
    image.style.maxWidth = 'unset'
    image.style.top = top + 'px'
    image.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }
  // related products
  const queryConfig: ProductConfig = { limit: '20', page: '1', category: product?.category._id }
  const { data: relatedProducts } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getproducts(queryConfig)
    },
    enabled: Boolean(product),
    staleTime: 3 * 60 * 1000
  })
  // console.log(relatedProducts)

  // addtocart
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchaseApi.addToCart(body)
  })
  const addToCart = () => {
    addToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: (data) => {
          toast.success(data.data.message, { delay: 1500 })
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }] })
        }
      }
    )
  }
  const buyNow = async () => {
    const res = await addToCartMutation.mutateAsync({ buy_count: buyCount, product_id: id })
    // console.log(res)
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null

  return (
    <div className='bg-gray-200 py-6'>
      <Helmet>
        <title>{product.name} | Shopee Clone</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              maxInputLength: 150
            }
          })}
        />
      </Helmet>
      <div className='bg-white p-4 shadow'>
        <div className='container'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div
                className='relative w-full overflow-hidden pt-[100%] shadow'
                onMouseMove={handleZoom}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImage}
                  alt={product.name}
                  className='pointer-events-none absolute top-0 left-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='pointer-events-none h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div
                      className='relative w-full pt-[100%] hover:cursor-pointer'
                      key={uuidv4()}
                      onMouseEnter={() => setActiveImage(img)}
                    >
                      <img
                        src={img}
                        alt={product.name}
                        className='absolute top-0 left-0 h-full w-full cursor-pointer bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0  border-2 border-solid border-primary' />}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='pointer-events-none h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='mr-1 border-b border-b-primary text-primary'>{product.rating}</span>
                  <ProductRating rating={product.rating} />
                </div>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Sold</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>₫{formatCurrency(product.price_before_discount)}</div>
                <div className='ml-3 text-3xl font-medium text-primary'>₫{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-primary px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} off
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Quantity</div>
                <QuantityController
                  max={product.quantity}
                  value={buyCount}
                  onIncrease={handleBycount}
                  onDecrease={handleBycount}
                  onType={handleBycount}
                  className='max-w-[100px] p-2 focus:outline-none'
                ></QuantityController>
                <div className='ml-6 text-sm text-gray-500'>
                  {product.quantity} {t('product:available')}
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-primary bg-primary/10 px-5 capitalize text-primary shadow-sm hover:bg-primary/5'
                  onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-primary text-primary'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Add to Cart
                </button>
                <button
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-primary px-5 capitalize text-white shadow-sm outline-none hover:bg-primary/90'
                  onClick={buyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Product Description</div>
          <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description)
              }}
            />
          </div>
        </div>
      </div>
      <div className='bg-white p-4'>
        <div className='container'>
          <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Related Products</div>

          <div className='mt-8 grid grid-cols-2 gap-2 p-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {relatedProducts &&
              relatedProducts.data.data.products.map((product) => (
                <ProductItem key={product._id} product={product}></ProductItem>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
