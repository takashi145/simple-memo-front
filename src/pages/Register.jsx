import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import AppLogo from '../components/AppLogo';

const Register = () => {

  const [username, setUserName] = useState('');
  
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [password_confirmation, setPasswordConfirmation] = useState('');

  const { register, errors } = useAuthContext();

  const handleRegister = async (event) => {
    event.preventDefault();
    register({ name: username, email, password, password_confirmation });
  }

  return (
    <>
      <div className="text-gray-600 body-font relative">
        <div className="container px-32 py-8 mx-auto flex">
          <form onSubmit={handleRegister} className="mx-auto lg:w-1/2 md:w-2/3 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-700 text-2xl mb-3 font-medium title-font text-center">新規登録</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">ユーザー名</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                value={username}
                onChange={(e) => {setUserName(e.target.value)}}
                placeholder="user"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.name} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="example@example.com"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">パスワード</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.password} />
            </div>
            <div className="relative mb-8">
              <label className="leading-7 text-sm text-gray-600">確認用パスワード</label>
              <input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                value={password_confirmation}
                onChange={(e) => {setPasswordConfirmation(e.target.value)}}
                placeholder="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
              <InputError errors={errors.password_confirmation} />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">新規登録</button>
            <div className='mt-4 flex flex-col space-y-2'>
              <Link to="/login" className=' text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>既にアカウントをお持ちですか？ログイン</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register