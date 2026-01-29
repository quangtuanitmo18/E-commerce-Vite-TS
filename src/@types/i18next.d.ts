import 'i18next'
import type HOME_VI from 'src/locales/vi/home.json'
import type PRODUCT_VI from 'src/locales/vi/product.json'
import type LOGIN_VI from 'src/locales/vi/login.json'
import type REGISTER_VI from 'src/locales/vi/register.json'
import type PROFILE_VI from 'src/locales/vi/profile.json'
import { defaultNS } from 'src/i18n/i18n'

declare module 'i18next' {
  // Kế thừa (thêm vào type)
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS
    resources: {
      home: typeof HOME_VI
      product: typeof PRODUCT_VI
      login: typeof LOGIN_VI
      register: typeof REGISTER_VI
      profile: typeof PROFILE_VI
    }
  }
}
