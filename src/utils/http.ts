import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse } from 'src/types/auth.type'
import { clearLS, getAccessTokenFromLS, setAccessTokenToLS, setProfileToLS } from './app'

class Http {
  instance: AxiosInstance
  private accessToken: string | undefined
  constructor() {
    // phai lay trước từ ở đây do lúc đầu nó sẽ request trước (cái trường hợp khi reload lại)
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        // console.log(this.accessToken)
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
        }
        return config
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        // console.log(url)
        if (url === path.login || url === path.register) {
          // console.log(response)
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          setAccessTokenToLS(this.accessToken)
          // console.log(this.accessToken)
          setProfileToLS(data.data.user)
        } else if (url === path.logout) {
          this.accessToken = ''
          clearLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
          // console.log(message)
        }
        // khi accesstoken hết hạn thì cần xóa nó đi ở localStorage và context
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS()
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
