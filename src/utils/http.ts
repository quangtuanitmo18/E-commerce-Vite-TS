import axios, { type AxiosInstance, AxiosError } from 'axios'
import { toast } from 'react-toastify'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from 'src/apis/auth.api'
import config from 'src/constants/config'
import { HttpStatusCode } from 'src/constants/httpStatusCode.enum'
import path from 'src/constants/path'
import { AuthResponse, RefreshAccessToken } from 'src/types/auth.type'
import { ErrorResponseApi } from 'src/types/utils.type'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './app'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'

class Http {
  instance: AxiosInstance
  private accessToken: string | undefined
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    // phai lay trước từ ở đây do lúc đầu nó sẽ request trước (cái trường hợp khi reload lại)
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
        // xet demo để làm chức năng
        //  mình sẽ lấy giá trij mặc định từ serve trả vềd
        // 'expire-access-token': 20,
        // 'expire-refresh-token': 60 * 60
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
        if (url === URL_LOGIN || url === URL_REGISTER) {
          // console.log(response)
          const data = response.data as AuthResponse
          this.accessToken = data.data.access_token
          this.refreshToken = data.data.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          // console.log(this.accessToken)
          setProfileToLS(data.data.user)
          // eslint-disable-next-line no-dupe-else-if
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        //  chỉ toast lỗi ko phải 422 và 401

        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
          // console.log(message)
        }
        // loi 401 co nhieu truowng hop
        // -  token ko ko đúng
        // - token het han
        // - ko truyền token
        if (isAxiosUnauthorizedError<ErrorResponseApi<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // console.log(config)
          // Trường hợp token hết hạn và request đó ko phải là của request refresh token
          //  thì mới tiền hành gọi refresh_token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // console.log('dsadasd')
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshAccessToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              if (config.headers) config.headers.authorization = access_token
              return this.instance(config)
            })
          }
          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        // if (error.response?.status === HttpStatusCode.Unauthorized) {
        // khi accesstoken hết hạn thì cần xóa nó đi ở localStorage và context
        // clearLS()
        // }

        return Promise.reject(error)
      }
    )
  }
  private handleRefreshAccessToken() {
    return this.instance
      .post<RefreshAccessToken>(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        const { access_token } = res.data.data
        setAccessTokenToLS(access_token)
        this.accessToken = access_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance
export default http
