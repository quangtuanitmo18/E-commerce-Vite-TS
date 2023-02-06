import { useState } from 'react'
import reactLogo from './assets/react.svg'
import useRouteElement from './useRouteElement'

function App() {
  const routeElements = useRouteElement()
  return <div>{routeElements}</div>
}

export default App
