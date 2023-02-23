import { createContext, useContext, useState } from 'react'
import { ExtendedPurchase } from 'src/types/purchases.type'
import { User } from 'src/types/user.type'
import { getAccessTokenFromLS, getProfileFromLS } from 'src/utils/app'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extendedPurchases: ExtendedPurchase[]
  setExtendedPurchases: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null
}
const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children, ...rest }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])

  // console.log(getAccessTokenFromLS())
  // console.log(isAuthenticated)

  const values = { isAuthenticated, setIsAuthenticated, profile, setProfile, extendedPurchases, setExtendedPurchases }

  return (
    <AppContext.Provider value={values} {...rest}>
      {children}
    </AppContext.Provider>
  )
}

function useApp() {
  const context = useContext(AppContext)
  if (typeof context === 'undefined') {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
export { useApp, AppProvider }
