import { Purchase, PurchaseListStatus } from 'src/types/purchases.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const url = 'purchases'

export const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponseApi<Purchase>>(`${url}/add-to-cart`, body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponseApi<Purchase[]>>(`${url}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponseApi<Purchase[]>>(`${url}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponseApi<Purchase>>(`${url}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponseApi<{ delete_count: number }>>(`${url}/purchases`, {
      data: purchaseIds
    })
  }
}
