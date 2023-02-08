import { createContext, useContext, useState } from 'react'
import { getAccessTokenFromLS } from 'src/utils/auth'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null
}

const AppContext = createContext<AppContextInterface>(initialAppContext)
const AppProvider = ({ children, ...rest }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const values = { isAuthenticated, setIsAuthenticated }

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
