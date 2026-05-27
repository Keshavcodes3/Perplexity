import React from 'react'
import {useSelector} from 'react-redux'
const App = ({ children }) => {
  const {user}=useSelector((state)=>state.auth)
  return children
}

export default App