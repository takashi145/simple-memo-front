import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuthContext from '../context/auth';
import AppLogo from './AppLogo';

const Header = () => {

  const [open, setOpen] = useState(false);

  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <header>
      <nav className="p-4 border-gray-200 shadow">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <AppLogo />
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className={`${open ? '' : 'hidden'} w-full md:block md:w-auto`}>
            { user ? (
              <button onClick={handleLogout} className='mt-3 md:mt-0 text-gray-600 hover:text-gray-800 hover:underline'>ログアウト</button>
            ) : (
              <>
                <div className='space-x-4 hidden md:block'>
                  <Link to="/login" className='text-gray-500 hover:text-gray-800 hover:underline'>ログイン</Link>
                  <Link to="/register" className='text-gray-500 hover:text-gray-800 hover:underline'>新規登録</Link>   
                </div>
                <div className='border-t pt-3 md:hidden flex flex-col mt-3 space-y-3'>
                  <Link to="/login" className='text-gray-500 hover:text-gray-800 hover:underline'>ログイン</Link>
                  <Link to="/register" className='text-gray-500 hover:text-gray-800 hover:underline'>新規登録</Link>   
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
