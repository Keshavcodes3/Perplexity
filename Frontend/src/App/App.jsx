import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter, RouterProvider } from 'react-router'
import { router } from './app.routes'
import { useAuth } from '../Features/Auth/Hooks/useAuth'

const App = () => {
  const auth=useAuth()
  useEffect(()=>{
    auth.handleGetMe()
  },[])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
