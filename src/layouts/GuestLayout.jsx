import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuthContext from '../context/auth'

const GuestLayout = () => {
  const { user } = useAuthContext();

  const [memoId, setMemoId] = useState(localStorage.getItem("memo"));

  return !user ? (
    <div className="text-gray-600 body-font relative">
      <div className="container px-5 md:py-12">
        <Outlet />
      </div>
    </div>
  ) : (
    memoId && memoId != 'undefined' ? (
      <Navigate to={`/memo/${memoId}`} replace={true} />
    ) : (
      <Navigate to={`/memo`} replace={true} />
    )
  )
}

export default GuestLayout