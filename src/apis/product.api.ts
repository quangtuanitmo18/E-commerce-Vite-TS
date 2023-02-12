import { Product, ProductConfig, ProductList } from 'src/types/product.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const url = 'products'

export const productApi = {
  getproducts(params: ProductConfig) {
    return http.get<SuccessResponseApi<ProductList>>(url, {
      params
    })
  },
  getProductDetail(id: string) {
    return http.get<SuccessResponseApi<Product>>(`${url}/${id}`)
  }
}
