import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import AppLogo from '../components/AppLogo';
import Input from '../components/Input';

const Login = () => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const { login, errors } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    await login({email, password});
    setPassword('');
  }

  return (
    <>
      <div className="text-gray-600 body-font relative">
        <div className="container max-w-lg px-5 py-12 mx-auto flex">
          <form onSubmit={handleLogin} className="mx-auto bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-700 text-2xl mb-3 font-medium title-font text-center">ログイン</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-6">
              <label className="leading-7 text-sm text-gray-600">パスワード</label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
              />
              <InputError errors={errors.password} />
            </div>
            <button 
              disabled={!email || !password}
              className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              ログイン
            </button>
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