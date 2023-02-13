import { category } from 'src/types/category.type'
import { SuccessResponseApi } from 'src/types/utils.type'
import http from 'src/utils/http'

const url = 'categories'

export const categoryApi = {
  getCategories() {
    return http.get<SuccessResponseApi<category[]>>(url)
  }
}
