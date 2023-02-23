import { useEffect } from 'react'
import { useApp } from './contexts/app.context'
import useRouteElement from './useRouteElement'
import { LocalStorageEventTarget } from './utils/app'

function App() {
  const routeElements = useRouteElement()
  // const { isAuthenticated } = useApp()
  // console.log(isAuthenticated)
  const { reset } = useApp()
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLs', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLs', reset)
    }
  }, [reset])

  return <div>{routeElements}</div>
}

export default App
