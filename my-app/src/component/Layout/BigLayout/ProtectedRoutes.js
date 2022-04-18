import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoutes() {
  const location = useLocation()
    const isAuth = ()=>{
        if(localStorage.getItem('ACCESS_TOKEN_MOVIE')){
            return true
        }
        return false
    }
    let checkAuth = isAuth()
  return (
    <div>
        {checkAuth?<Outlet/>:<Navigate to='signIn'  state={{from:location}} replace/>}
    </div>
  )
}
