import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { useApp } from './contexts/app.context'
import useRouteElement from './useRouteElement'

function App() {
  const routeElements = useRouteElement()
  // const { isAuthenticated } = useApp()
  // console.log(isAuthenticated)

  return <div>{routeElements}</div>
}

export default App
