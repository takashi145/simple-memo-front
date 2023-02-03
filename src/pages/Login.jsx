import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const { login, errors } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    login({email, password});
  }

  return (
    <>
      <div className="text-gray-600 body-font relative">
        <div className="container px-5 py-32 mx-auto flex">
          <form onSubmit={handleLogin} className="mx-auto lg:w-1/3 md:w-2/3 bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-3 font-medium title-font">SignIn</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-8">
              <label className="leading-7 text-sm text-gray-600">Password</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.password} />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">SignIn</button>
            <div className='mt-4 flex flex-col space-y-2'>
              <Link to="/forgot-password" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>パスワードをお忘れですか?</Link>
              <Link to="/register" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>アカウントをお持ちではありませんか?新規登録</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login