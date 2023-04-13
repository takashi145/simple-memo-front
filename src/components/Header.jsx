import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import useAuthContext from '../context/auth';
import AppLogo from './AppLogo';

const Header = () => {

  const [open, setOpen] = useState(false);

  const [hover, setHover] = useState(false);

  const { user, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      <nav className="py-2 px-4 border-gray-200 shadow">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <AppLogo />
          <button type="button" onClick={() => setOpen(!open)} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          </button>
          <div className={`${open ? '' : 'hidden'} w-full md:block md:w-auto`}>
            { user ? (
              <div className='mt-3 md:mt-0 flex flex-col md:flex-row md:items-center'>
                <button 
                  type="button" 
                  onMouseEnter={() => setHover(true)} 
                  onMouseLeave={() => setHover(false)} 
                  className="cursor-default md:cursor-pointer mr-3 flex items-center font-medium text-gray-600 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mr-1 hidden md:block text-indigo-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className='text-sm md:hidden'>ユーザー：</span>
                  <span className='text-sm mr-2'>{ user.name }</span>
                </button>
                {hover && (
                  <div className='hidden md:block fixed bg-white mt-32 p-3 rounded shadow-lg'>
                    <div className='text-sm'>{user.email}</div>
                    <div className='border-t mt-2 pt-2 text-sm text-center text-indigo-500'>
                      ログイン中
                    </div>
                  </div>
                )}
                <div className='md:hidden py-2 text-sm'>
                  { user.email }
                </div>
                <div className="pt-3 md:pt-0 border-t md:border-none border-gray-300">
                  <button onClick={() => handleLogout()} className="block p-2 text-sm text-gray-600 bg-gray-300 hover:bg-gray-400 shadow rounded">ログアウト</button>
                </div>
              </div>
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
    </>
  )
}

export default Header
