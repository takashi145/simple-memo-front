import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../context/auth'

const AuthLayout = () => {
  const { user } = useAuthContext();
  
  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  )
}

export default AuthLayout