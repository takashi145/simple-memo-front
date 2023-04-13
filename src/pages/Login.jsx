import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import InputError from '../components/InputError';
import useAuthContext from '../context/auth';
import Input from '../components/Input';
import Label from '../components/Label';
import Button from '../components/Button';

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
      <form onSubmit={handleLogin} className="max-w-lg mx-auto bg-gray-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
        <h2 className="text-gray-700 text-2xl mb-3 font-medium title-font text-center">ログイン</h2>
        <div className="relative mb-4">
          <Label value="メールアドレス" />
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
          <Label value="パスワード" />
          <Input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <InputError errors={errors.password} />
        </div>
        <Button 
          type="submit"
          disabled={!email || !password}
          className="text-white bg-indigo-500 hover:bg-indigo-600 text-lg"
        >
          ログイン
        </Button>
        <div className='mt-4 flex flex-col space-y-2'>
          <Link to="/forgot-password" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>パスワードをお忘れですか?</Link>
          <Link to="/register" className='text-gray-500 hover:text-gray-800 hover:cursor-pointer hover:underline'>アカウントをお持ちではありませんか?新規登録</Link>
        </div>
      </form>
    </>
  )
}

export default Login