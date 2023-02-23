import { useQuery, useMutation } from '@tanstack/react-query'
import { Link, useLocation } from 'react-router-dom'
import { purchaseApi } from 'src/apis/purchase.api'
import { purchaseStatus } from 'src/constants/purchase'
import path from 'src/constants/path'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import QuantityController from 'src/components/quantityController'
import Button from 'src/components/button'
import { Purchase } from 'src/types/purchases.type'
import { useEffect, useMemo } from 'react'
import produce from 'immer'
import { keyBy } from 'lodash'
import { toast } from 'react-toastify'
import { useApp } from 'src/contexts/app.context'

export default function Cart() {
  const { extendedPurchases, setExtendedPurchases } = useApp()
  // const purchaseId = (location.state as { purchaseId: string }).purchaseId
  const location = useLocation()
  const purchaseIdFromLocation = location?.state?.purchaseId || null

  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchaseStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchaseStatus.inCart })
  })
  // console.log('dsadas')
  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      // console.log(data)
      toast.success(data.data.message)
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
    }
  })
  //  tối ưu peformance đoạn này do có nhiều useMutation

  const purchasesInCart = useMemo(() => purchasesInCartData?.data.data, [purchasesInCartData])
  // console.log(purchasesInCart)
  const isAllChecked = useMemo(() => extendedPurchases.every((purchase) => purchase.checked), [extendedPurchases])
  const checkedPurchases = useMemo(() => extendedPurchases.filter((purchase) => purchase.checked), [extendedPurchases])
  const lengthCheckedPurchase = checkedPurchases.length || 0

  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const handleChecked = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      // console.log(value)
      const purchase = extendedPurchases[purchaseIndex]
      // console.log(purchase)
      // console.log(value)
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }
  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }
  const handleDeleteManyPurchase = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }
  const handleBuyPurchases = () => {
    if (lengthCheckedPurchase > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body)
    }
  }

  // console.log(extendedPurchases)
  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      // const isPurchaseFromLocation = purchaseIdFromLocation ===
      // console.log(extendedPurchasesObject)
      return (
        purchasesInCart?.map((purchase) => {
          const isPurchaseFromLocation = purchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            checked: isPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked),
            disabled: false
          }
        }) || []
      )
    })
  }, [purchaseIdFromLocation, purchasesInCart])
  // giờ cần xóa mấy cái trong history state đi
  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  return (
    <div className='bg-neutral-100 py-16'>
      {purchasesInCart && purchasesInCart?.length > 0 ? (
        <div className='container'>
          <div className='overflow-auto'>
            <div className='min-w-[1000px]'>
              <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                <div className='col-span-6'>
                  <div className='flex items-center'>
                    <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                      <input
                        type='checkbox'
                        className='h-5 w-5 accent-primary'
                        onChange={handleCheckAll}
                        checked={isAllChecked}
                      />
                    </div>
                    <div className='flex-grow text-black'>Sản phẩm</div>
                  </div>
                </div>
                <div className='col-span-6'>
                  <div className='grid grid-cols-5 text-center'>
                    <div className='col-span-2'>Đơn giá</div>
                    <div className='col-span-1'>Số lượng</div>
                    <div className='col-span-1'>Số tiền</div>
                    <div className='col-span-1'>Thao tác</div>
                  </div>
                </div>
              </div>
              <div className='my-3 rounded-sm bg-white p-5 shadow'>
                {extendedPurchases?.map((purchase, index) => (
                  <div
                    key={purchase._id}
                    className='mb-5 grid grid-cols-12 rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                  >
                    <div className='col-span-6'>
                      <div className='flex'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-primary'
                            onChange={handleChecked(index)}
                            checked={purchase.checked}
                          />
                        </div>
                        <div className='flex-grow'>
                          <div className='flex'>
                            <Link
                              className='h-20 w-20 flex-shrink-0'
                              to={`${path.home}${generateNameId({
                                name: purchase.product.name,
                                id: purchase.product._id
                              })}`}
                            >
                              <img alt={purchase.product.name} src={purchase.product.image} />
                            </Link>
                            <div className='flex-grow px-2 pt-1 pb-2'>
                              <Link
                                to={`${path.home}${generateNameId({
                                  name: purchase.product.name,
                                  id: purchase.product._id
                                })}`}
                                className='line-clamp-2'
                              >
                                {purchase.product.name}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 items-center'>
                        <div className='col-span-2'>
                          <div className='flex items-center justify-center'>
                            <span className='text-gray-300 line-through'>
                              ₫{formatCurrency(purchase.product.price_before_discount)}
                            </span>
                            <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                          </div>
                        </div>
                        <div className='col-span-1'>
                          <QuantityController
                            max={purchase.product.quantity}
                            value={purchase.buy_count}
                            className='w-12 rounded-none p-[5px]'
                            onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                            onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                            onFocusOut={(value) => {
                              // console.log(value, purchase.buy_count)
                              return handleQuantity(
                                index,
                                value,
                                value >= 1 &&
                                  value <= purchase.product.quantity &&
                                  value != (purchasesInCart as Purchase[])[index].buy_count
                              )
                            }}
                            onType={handleTypeQuantity(index)}
                            disabled={purchase.disabled}
                          />
                        </div>
                        <div className='col-span-1'>
                          <span className='text-primary'>
                            ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                          </span>
                        </div>
                        <div className='col-span-1'>
                          <button
                            className='bg-none text-black transition-colors hover:text-primary'
                            onClick={handleDeletePurchase(index)}
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
            <div className='flex items-center'>
              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                <label className='flex cursor-pointer items-center gap-2'>
                  <input
                    type='checkbox'
                    className='h-5 w-5 accent-primary'
                    checked={isAllChecked}
                    onChange={handleCheckAll}
                  />
                  <span>Chọn tất cả</span>
                </label>
              </div>

              <button className='mx-3 border-none bg-none' onClick={handleDeleteManyPurchase}>
                Xóa
              </button>
            </div>

            <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
              <div>
                <div className='flex items-center sm:justify-end'>
                  <div>Tổng thanh toán ({lengthCheckedPurchase} sản phẩm):</div>
                  <div className='ml-2 text-2xl text-primary'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
                </div>
                <div className='flex items-center text-sm sm:justify-end'>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-primary'>₫{formatCurrency(totalCheckedSavingPrice)}</div>
                </div>
              </div>
              <Button
                className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                onClick={handleBuyPurchases}
                disabled={buyPurchaseMutation.isLoading}
              >
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='container text-center'>
          <div className='mb-5'>Giỏ hàng hiện tại đang trống</div>

          <div>
            Vui lòng quay lại
            <Link className='text-primary' to={path.home}>
              trang chủ
            </Link>{' '}
            để mua hàng
          </div>
        </div>
      )}
    </div>
  )
}
