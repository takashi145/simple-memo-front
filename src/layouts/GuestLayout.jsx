import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../context/auth'

const GuestLayout = () => {
  const { user } = useAuthContext();
  
  return !user ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to='/memo' />
  )
}

export default GuestLayout