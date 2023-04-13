import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import AppLogo from '../components/AppLogo';
import Input from '../components/Input';

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
        <div className="container max-w-lg md:py-8 mx-auto flex">
          <form onSubmit={handleRegister} className="mx-auto bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-700 text-2xl mb-3 font-medium title-font text-center">新規登録</h2>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">ユーザー名</label>
              <Input 
                type="text" 
                id="username" 
                name="username"
                value={username}
                onChange={(e) => {setUserName(e.target.value)}}
                placeholder="user"
              />
              <InputError errors={errors.name} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">メールアドレス</label>
              <Input
                type="email" 
                id="email" 
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                placeholder="example@example.com"
              />
              <InputError errors={errors.email} />
            </div>
            <div className="relative mb-4">
              <label className="leading-7 text-sm text-gray-600">パスワード</label>
              <Input 
                type="password" 
                id="password" 
                name="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                placeholder="password"
              />
              <InputError errors={errors.password} />
            </div>
            <div className="relative mb-8">
              <label className="leading-7 text-sm text-gray-600">確認用パスワード</label>
              <Input 
                type="password" 
                id="password_confirmation" 
                name="password_confirmation" 
                value={password_confirmation}
                onChange={(e) => {setPasswordConfirmation(e.target.value)}}
                placeholder="password"
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