import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import PRODUCT_EN from 'src/locales/en/product.json'
import HOME_VI from 'src/locales/vi/home.json'
import PRODUCT_VI from 'src/locales/vi/product.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  ns: ['home', 'product'],
  fallbackLng: 'en',
  defaultNS,
  interpolation: {
    escapeValue: false // react already safes from xss
  }
})

export type LazyNamespace = 'login' | 'register' | 'profile'

async function loadNamespaceResources(ns: LazyNamespace) {
  switch (ns) {
    case 'login': {
      const [en, vi] = await Promise.all([import('src/locales/en/login.json'), import('src/locales/vi/login.json')])
      i18n.addResourceBundle('en', 'login', en.default, true, true)
      i18n.addResourceBundle('vi', 'login', vi.default, true, true)
      return
    }
    case 'register': {
      const [en, vi] = await Promise.all([
        import('src/locales/en/register.json'),
        import('src/locales/vi/register.json')
      ])
      i18n.addResourceBundle('en', 'register', en.default, true, true)
      i18n.addResourceBundle('vi', 'register', vi.default, true, true)
      return
    }
    case 'profile': {
      const [en, vi] = await Promise.all([
        import('src/locales/en/profile.json'),
        import('src/locales/vi/profile.json')
      ])
      i18n.addResourceBundle('en', 'profile', en.default, true, true)
      i18n.addResourceBundle('vi', 'profile', vi.default, true, true)
      return
    }
  }
}

export async function ensureNamespaces(namespaces: LazyNamespace[]) {
  const toLoad = namespaces.filter((ns) => !i18n.hasResourceBundle('en', ns) || !i18n.hasResourceBundle('vi', ns))
  await Promise.all(toLoad.map(loadNamespaceResources))
}

export default i18n
