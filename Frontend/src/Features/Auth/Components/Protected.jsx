import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { useNavigate } from 'react-router'
import Skeleton from './Skeleton'
const Protected = ({children}) => {
    const navigate=useNavigate()
    const user=useSelector(state=>state.auth.user)
    const loading=useSelector(state=>state.auth.loading)
    if(loading){
        return <Skeleton/>
    }
    if(!user){
        navigate('/login')
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default Protected
