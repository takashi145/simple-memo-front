import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthContext from '../context/auth'

const GuestLayout = () => {
  const { user } = useAuthContext();

  const [memoId, setMemoId] = useState(localStorage.getItem("memo"));

  return !user ? (
    <>
      <Outlet />
    </>
  ) : (
    memoId && memoId != 'undefined' ? (
      <Navigate to={`/memo/${memoId}`} replace={true} />
    ) : (
      <Navigate to={`/memo`} replace={true} />
    )
  )
}

export default GuestLayout