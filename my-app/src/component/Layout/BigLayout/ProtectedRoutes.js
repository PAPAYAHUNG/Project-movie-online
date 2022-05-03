import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function ProtectedRoutes({ allowRoles }) {
  let navigate = useNavigate()
  const userInfo = JSON.parse(localStorage.getItem('USER_LOGIN_MOVIE'))

  const location = useLocation()
  const isAuth = () => {
    // if(localStorage.getItem('ACCESS_TOKEN_MOVIE') && userInfo.maLoaiNguoiDung !=="QuanTri" ){
    //   navigate("/unauthorized")
    //   return
    // }
    if (localStorage.getItem('ACCESS_TOKEN_MOVIE')) {
      let typeUser = [userInfo.maLoaiNguoiDung]
      let user = true
      return {user,typeUser}
    }
else{
  let user = false
  return {user}
}
  }
  let checkAuth = isAuth()
  console.log('checkAuth', checkAuth.user,checkAuth.typeUser)

  const sortRoles = () => {
    console.log('logic',checkAuth?.typeUser?.find(item => allowRoles?.includes(item)))
    if (checkAuth.user && checkAuth?.typeUser?.find(item => allowRoles?.includes(item))) {
      return <Outlet />
    }
    if (checkAuth.user && !checkAuth?.typeUser?.find(item => allowRoles?.includes(item))) {
      
      return <Navigate to='/unauthorized' state={{ from: location }} replace />
    }
    else{
      return <Navigate to='signIn' state={{ from: location }} replace />
    }
  }

  return (
    <div>
        {sortRoles()}
      {/* {checkAuth ? <Outlet /> : <Navigate to='signIn' state={{ from: location }} replace />} */}
    </div>
  )
}
